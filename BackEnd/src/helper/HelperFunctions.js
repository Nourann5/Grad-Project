function MergeImageLink(req, imageLink) {
  const baseUrl = `${req.protocol}://${req.get('host')}/public/uploads/`;

  return `${baseUrl}${imageLink}`;
}
function SplitImageLink(req, imageLink) {
  const baseUrl = `${req.protocol}://${req.get('host')}/public/uploads/`;

  return imageLink.split(baseUrl)[1];
}
function PaginateSchema(currentPage, pages, count, data) {
  return {
    currentPage,
    pages,
    count,
    data,
  };
}
function ResponseSchema(message, status, data) {
  return {
    message,
    status,
    data,
  };
}
module.exports = {
  MergeImageLink, SplitImageLink, ResponseSchema, PaginateSchema,
};
