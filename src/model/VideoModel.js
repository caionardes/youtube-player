exports.VideoModel = (videoId, title, description, thumbnailURL) => {
    return {
        videoId : videoId,
        title : title,
        description : description,
        thumbnailURL : thumbnailURL
    }
}

exports.ResultadoPesquisaVideos = (totalResults, resultsPerPage, videos) => {
    return {
        videos : videos,
        totalResults : totalResults,
        resultsPerPage : resultsPerPage
    }
}