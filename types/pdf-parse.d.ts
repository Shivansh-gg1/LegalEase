declare module "pdf-parse" {
  import { Buffer } from "buffer"

  interface PdfData {
    text: string
    // add more fields if you need them (numpages, info, etc.)
  }

  function pdfParse(buffer: Buffer): Promise<PdfData>

  export default pdfParse
}
