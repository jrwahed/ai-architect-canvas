// The CV lives in public/ so it isn't bundled into the JS.
export const CV_PDF_URL = "/Mohamed_Waheed_CV.pdf";

export const downloadCV = () => {
  const link = document.createElement("a");
  link.href = CV_PDF_URL;
  link.download = "Mohamed_Waheed_CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
