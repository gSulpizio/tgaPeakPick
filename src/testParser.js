/**
 * Returns a very important number
 * @return {number}
 */
export function testParser(file) {
  const config = { header: true };
  let data = Papa.parse(file, config);
  console.table(data);
  return 42;
}
