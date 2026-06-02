import PDFDocument from "pdfkit";

export const pdfGenerator = async (req, res) => {
  try {
    const result = req.body;

    if (!result) {
      return res.status(400).json({ error: "No content found" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamIo.pdf"'
    );

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("Exam.io", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Importance: ${result.importance}`);
    doc.moveDown();

    // Subtopics
    doc.fontSize(16).text("Sub Topics");
    doc.moveDown(0.5);

    Object.entries(result.subTopics).forEach(([star, topics]) => {
      doc.moveDown(0.5);

      doc.fontSize(14).text(`${star} Topics:`);

      topics.forEach((t) => {
        doc.fontSize(12).text(`- ${t}`);
      });
    });

    doc.moveDown();

    // Notes
    doc.fontSize(16).text("Notes");
    doc.moveDown(0.5);
    doc.fontSize(12).text(result.notes.replace(/\n/g, " "));

    doc.moveDown();

    //revesion notes
    doc.fontSize(16).text("Revision Notes");
    doc.moveDown(0.5);
    result.revisionPoints.forEach((point) => {
      doc.fontSize(12).text(`- ${point}`);
    });

    doc.moveDown();

    //questions
    doc.fontSize(16).text("Questions");
    doc.moveDown(0.5);

    doc.fontSize(12).text("Short Questions:");
    result.questions.short.forEach((q) => {
      doc.fontSize(12).text(`- ${q}`);
    });

    doc.moveDown(0.5);

    doc.fontSize(12).text("Long Questions:");
    result.questions.long.forEach((q) => {
      doc.fontSize(12).text(`- ${q}`);
    });

    doc.moveDown();

    doc.fontSize(16).text("Diagram Questions");
    doc.fontSize(12).text(result.questions.diagram);

    doc.end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to generate PDF",
    });
  }
};