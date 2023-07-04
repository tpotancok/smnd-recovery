import { NextApiRequest, NextApiResponse } from "next";
import { s3 } from "../../lib/aws";
import { IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const form = new IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }

    console.log(fields);
  });

  // For testing purposes, this will later process the incoming form
  // s3.listObjectsV2({ Bucket: "smnd-recovery" }, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).json({ error: err });
  //   } else {
  //     res.status(200).json({ data: data.Contents });
  //   }
  // });

  console.log(req.body);
}
