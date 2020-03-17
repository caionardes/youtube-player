import * as YouTubeApi from "./YouTubeApi"

let PREFIX_BY_KEYWORD = "VS_BY_KEYWORD:"

export function listByKeyword(keyword) {
    let KEY = PREFIX_BY_KEYWORD + keyword;

    let promise;
    if (localStorage.getItem(KEY) != null) {
        console.log("Possui Cache, retornando..")
        promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(JSON.parse(localStorage.getItem(KEY))), 1000);
        });
    } else {
        console.log("Não tem cache!")
        promise = YouTubeApi.listByKeyword(keyword);    
    }
    return promise.then(function(it) {
        localStorage.setItem(KEY, JSON.stringify(it));
        return it;
    }).then(function(it) {
        return YouTubeApi.toVideoModel(it);
    });
}