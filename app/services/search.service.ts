import { createTrie, type ITrieNode } from "~/utils/trie";

export const searchService = (() => {
  let trie: ITrieNode | null = null;
  let initTrie = (keywords: string[]) => {
    trie = createTrie(keywords);
  };

  let searchKeyword = (keyword: string) => {
    let res: string[] = [];
    console.log("TRIE", trie);
    if (trie) {
      res = trie.search(keyword);
    }
    return res;
  };

  return { initTrie, searchKeyword };
})();
