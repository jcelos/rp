class Flofs {
  constructor(private queue: number[]) {}

  getUnpaired(): number[] {
    const result: number[] = [];

    for (let i = 0; i < this.queue.length; i++) {
      let count = 0;
      for (let j = 0; j < this.queue.length; j++) {
        if (this.queue[i] === this.queue[j]) count++;
      }
      if (count % 2 !== 0 && result.indexOf(this.queue[i]) === -1) {
        result.push(this.queue[i]);
      }
    }

    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[i] > result[j]) {
          const temp = result[i];
          result[i] = result[j];
          result[j] = temp;
        }
      }
    }

    return result;
  }
}

console.log(new Flofs([37, 36, 36, 37, 38]).getUnpaired()); 
console.log(new Flofs([36, 37, 38, 39, 37]).getUnpaired());
console.log(new Flofs([36, 37, 38, 36, 37, 38]).getUnpaired());
