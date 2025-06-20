interface ITrieNode {
  add(word: string): void;
  search(query: string, limit?: number): string[];
}

class TrieNode implements ITrieNode {
  private readonly value: string;
  private children: TrieNode[];
  private terminal: boolean;

  constructor(value: string) {
    this.value = value[0];
    this.children = [];
    this.terminal = false;
    /**
     * When adding the node eunsure to add the word as individual letters
     */

    if (value.length > 1) {
      this.children.push(new TrieNode(value.substr(1)));
    } else {
      this.terminal = true;
    }
  }

  _complete(
    term: string,
    prefix: string,
    results: string[],
    limit: number = 3
  ): string[] {
    if ((term && term[0] !== this.value) || results.length >= limit) {
      return results;
      // this is the base case for our
      // recursion where we see if the value and
      // term matches and we are not exceeding the results length
    }
    if (this.terminal) {
      const newWord: string = `${prefix}${this.value}`;
      results.push(newWord);
    }
    // this check ensures that we are finding the terminal value
    // and add those words into the results array

    // iterating on the children to find the corresponding results
    for (let child of this.children) {
      results = child._complete(
        term.substr(1),
        `${prefix}${this.value}`,
        results,
        limit
      );
    }

    return results;
  }

  add(word: string): void {
    const letter: string = word[0];
    const next: string = word.substr(1);
    for (let child of this.children) {
      /**
       * While adding if the value is equal to the letter then the subtree can be chosen.
       * Once the subtree is chosen we cn add the rest of the word
       * if rest of word is empty then the entire word is added so we can park it as terminal
       */
      if (child.value === letter) {
        if (next) {
          child.add(next);
        } else {
          child.terminal = true;
        }
        /**
         * This return esures that we can exiting from the loop once the word is done
         */
        return;
      }
    }
    this.children.push(new TrieNode(word));
  }

  search(query: string, limit: number = 10): string[] {
    let results: string[] = [];
    for (let child of this.children) {
      results = results.concat(child._complete(query, "", [], limit));
    }
    return results;
  }
}

const createTrie = (words: string[]): TrieNode => {
  let root: TrieNode = new TrieNode("");
  for (let word of words) {
    root.add(word);
  }
  return root;
};

export { createTrie, type ITrieNode };
