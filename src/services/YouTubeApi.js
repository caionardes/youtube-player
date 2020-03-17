import { VideoModel, ResultadoPesquisaVideos } from "../model/VideoModel.js";

const https = require('https');

// O PROBLEMA ESTA AQUI AO CONVERTER OS VALORES DA ALGUM ERRO E RETORNA undefined
export function toVideoModel(youtubeData) {
    const items = youtubeData.items || {};

    const { totalResults, resultsPerPage } = youtubeData.pageInfo || { totalResults:0, resultsPerPage:0};

    var videos = items.reduce(function(result, item) {
        const { videoId, kind } = item.id;
        const { title, description } = item.snippet;
        const url = item.snippet.thumbnails.default.url; // , width, height

        // Ignora resultados diferente de Video, como Canais e Playlists.
        if (kind && kind === "youtube#video") {
            result.push(VideoModel(videoId, title, description, url)); 
        }
        return result;
    }, []);

    return ResultadoPesquisaVideos(totalResults, resultsPerPage, videos);
}

export function listByKeyword(keyword) {
    
    return new Promise((resolve, reject) => {
        
        const YOUTUBE_API_KEY = "AIzaSyCuMCIHLvENzc89eKVfFBz1Zt9oqoaIoKU";
        const QTD_RESULTADOS = 25;
        
        const URL = 
            keyword === "Baby Shark" ?
            'https://demo3151957.mockable.io/'
            : `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${QTD_RESULTADOS}&q=${keyword}&key=${YOUTUBE_API_KEY}&safeSearch=strict`
            ;

        https.get(URL, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                const r = JSON.parse(data);
                r.keyword = keyword;
                resolve(r);
            });
        }).on("error", (err) => {
            reject(err);
        }).end();
    });
}