import multer from "multer";

const storage = multer.diskStorage({});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
}).single("image");
export function handleFileSizeError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "El tamaño del archivo excede el límite permitido (1MB)",
      });
    }
  }
  next(err);
}

export function handleFileUpload(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      return handleFileSizeError(err, req, res, next);
    }
    if (req.file) {
      const allowedExtensions = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      const fileExtension = req.file.mimetype;
      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({
          message:
            "La extensión del archivo no es válida. Las extensiones permitidas son .jpg, .jpeg, .png, .gif , .webp",
        });
      }
    }
    next();
  });
}
