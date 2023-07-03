import { NextApiRequest, NextApiResponse } from "next";
import { s3 } from "../../lib/aws";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // For testing purposes, this will later process the incoming form
  s3.listObjectsV2({ Bucket: "smnd-recovery" }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ data: data.Contents });
    }
  });
}
