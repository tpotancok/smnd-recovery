import { NextApiRequest, NextApiResponse } from "next";
import { s3 } from "@/lib/aws";
import { z } from "zod";

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

type RequestBody = {
  files: { name: string; type: string }[];
  material: string;
  teacher: string;
  subject: string;
  year: string;
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
    subject: z.string(),
    year: z.nativeEnum(Year),
  })
  .strict();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const body = req.body as RequestBody;

  const parser = requestBodySchema.safeParse(body);
  if (!parser.success) return res.status(400).json({ error: "Invalid request body" });

  try {
    const { files } = body;

    const signedUrls = await Promise.all(
      files.map(async (file) => {
        const fileParams = {
          Bucket: "smnd-recovery",
          Key: `${body.year}/${body.subject}/${file.name}`,
          Expires: 600,
          ContentType: file.type,
        };
        return await s3.getSignedUrlPromise("putObject", fileParams);
      })
    );

    res.status(200).json({ signedUrls });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
