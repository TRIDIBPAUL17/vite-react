export const fetchArtworks = async (page: number) => {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
    const data = await response.json();
    return {
        artworks: data.data,
        totalRecords: data.pagination.total,
    };
};
