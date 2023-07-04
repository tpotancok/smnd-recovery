import { NextApiRequest, NextApiResponse } from "next";
import { s3 } from "@/lib/aws";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { nanoid } from "nanoid";

enum Year {
  ROCNIK_5 = "5",
  PRIMA = "prima",
  SEKUNDA = "sekunda",
  TERCIA = "tercia",
  KVARTA = "kvarta",
  KVINTA = "kvinta",
  SEXTA = "sexta",
  SEPTIMA = "septima",
  OKTAVA = "oktava",
  OTHER = "other",
}

enum Subject {
  ANJ = "ANJ",
  ANL = "ANL",
  BIO = "BIO",
  CHE = "CHE",
  cBIO = "cBIO",
  cCHE = "cCHE",
  cFYZ = "cFYZ",
  cGEG = "cGEG",
  cMAT = "cMAT",
  DES = "DES",
  DEJ = "DEJ",
  DEU = "DEU",
  EFI = "EFI",
  ETV = "ETV",
  EVN = "EVN",
  FIG = "FIG",
  FYZ = "FYZ",
  FyV = "FyV",
  GEG = "GEG",
  GZC = "GZC",
  HUV = "HUV",
  INF = "INF",
  KAJ = "KAJ",
  KNJ = "KNJ",
  MAT = "MAT",
  NAB = "NAB",
  NEJ = "NEJ",
  OBN = "OBN",
  PMO = "PMO",
  PRO = "PRO",
  PSE = "PSE",
  PSY = "PSY",
  RET = "RET",
  RUS = "RUS",
  sBIO = "sBIO",
  sCHE = "sCHE",
  sDEJ = "sDEJ",
  sEKO = "sEKO",
  sFYZ = "sFYZ",
  sGEG = "sGEG",
  sINF = "sINF",
  sMAT = "sMAT",
  sNEJ = "sNEJ",
  sSJL = "sSJL",
  sSJA = "sSJA",
  SVS = "SVS",
  SJA = "SJA",
  TECH = "TECH",
  TvP = "TvP",
  UaK = "UaK",
  VYV = "VYV",
}

type SubmitBody = {
  files: { name: string; type: string }[];
  material: string;
  teacher: string;
  subject: string;
  year: Year;
};

const requestBodySchema = z
  .object({
    files: z.array(
      z
        .object({
          name: z.string(),
          type: z.string(),
        })
        .strict()
    ),
    material: z.string(),
    teacher: z.string(),
    subject: z.nativeEnum(Subject),
    year: z.nativeEnum(Year),
  })
  .strict();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const body = req.body as SubmitBody;

  const parser = requestBodySchema.safeParse(body);
  if (!parser.success) return res.status(400).json({ error: parser.error });

  try {
    const { files } = body;

    // Append random string to file name to prevent collisions
    files.forEach((file) => (file.name = `${nanoid(5)}_${file.name}`));

    const signedUrls = await Promise.all(
      files.map(async (file) => {
        const fileParams = {
          Bucket: "smnd-recovery",
          Key: `${body.year}/${body.subject}/${file.name.replaceAll(/ /g, "_")}`,
          Expires: 600,
          ContentType: file.type,
        };
        return await s3.getSignedUrlPromise("putObject", fileParams);
      })
    );

    await prisma.metadata.create({
      data: {
        material: body.material,
        teacher: body.teacher,
        subject: body.subject,
        year: body.year,
        files: files
          .map((file) => `${body.year}/${body.subject}/${file.name.replaceAll(/ /g, "_")}`)
          .join(","),
        userIp: String(req.headers["x-real-ip"] || req.socket.remoteAddress),
      },
    });

    res.status(200).json({ signedUrls });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
