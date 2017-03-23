function search() {
    var request = new XMLHttpRequest();
    var query = document.querySelector('input[type=search]').value;

    if(localStorage.getItem(query) != undefined &&
      localStorage.getItem(query) != null) {
        // We have the article in the cache
        console.log("Cached data for " + query);
        document.querySelector('#result').innerHTML =
            localStorage.getItem(query);
    } else {
        // It's not in the cache
        var mwjs = MediaWikiJS('https://en.wikipedia.org');
        mwjs.send(
            {
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                titles: query
            },
            function (data) {
                var pageId;
                for (pageId in data.query.pages) break;
                var page = data.query.pages[pageId].revisions[0]['*'];
                console.log("Fetch data for " + query);
                // Save result in cache
                localStorage.setItem(query, page);
                document.querySelector('#result').innerHTML = page;
            }
        );
    }
}
