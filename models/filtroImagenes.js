const gallerySchema = new mongoose.Schema({
    campus: String,
    year_graduacion: String,
    session: String,
    fotos_graduacion: [String]
});

const Gallery = mongoose.model('Gallery', gallerySchema);