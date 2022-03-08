export async function fetchFromNFTPort (input : any) {

    var request = {  
        method: 'GET',
        headers: {
          'Authorization': '83155c0c-220c-49c4-9b06-2bf929674a17'
        },
      }

    const response = await fetch(`https://api.nftport.xyz/v0/search?text=${input}`,request);
    const data = await response.json();
    // console.log('fetched this data', data);

    return data.search_results;
}

export function checkFormat (item:any) {
    let url = item.cached_file_url;
    return url.substr(url.length-3) == 'png' || url.substr(url.length-4) == 'jpeg'
}