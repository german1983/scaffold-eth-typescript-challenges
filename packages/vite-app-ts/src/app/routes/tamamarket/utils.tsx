export async function fetchFromNFTPort(input: any) {

  var request = {
    method: 'GET',
    headers: {
      'Authorization': '83155c0c-220c-49c4-9b06-2bf929674a17'
    },
  }

  const response = await fetch(`https://api.nftport.xyz/v0/search?text=${input}`, request);
  const data = await response.json();
  // console.log('fetched this data', data);

  return data.search_results;
}

// This is not the best approach probably... but keeping it for now
export function checkFormat(item: OwnedByUserNFT) {
  let url = item.file_url || '';
  return url.endsWith('png') || url.endsWith('jpg') || url.endsWith('jpeg');
}


interface OwnedByUserNFTResponse {
  response: string;
  nfts: OwnedByUserNFT[];
}

export interface OwnedByUserNFT {
  contract_address: string;
  token_id: string;
  name: null;
  description: null;
  file_url: null;
  creator_address: string;
}

export async function fetchNFTsOwnedByAccount(accountAddres: string): Promise<OwnedByUserNFT[]> {

  var request = {
    method: 'GET',
    headers: {
      'Authorization': '83155c0c-220c-49c4-9b06-2bf929674a17'
    },
  }
  const chains = new Array("ethereum", "polygon");
  const nfts = new Array();


  await Promise.all(chains.map(async (chain) => {
    const response = await fetch(`https://api.nftport.xyz/v0/accounts/${accountAddres}?chain=${chain}`, request);
    const data = await response.json();
    nfts.push(data.nfts);
  }));

  return nfts.reduce((acc, val) => acc.concat(val), []);
}