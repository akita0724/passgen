import { Command } from 'https://deno.land/x/cliffy@v0.25.0/command/mod.ts';

const numbers = '0123456789';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const loose_symbols = '~!@#$%^&*()-_=+[{]}|;:,<.>/?';
const strict_symbols = '.-_/';

const default_length = 16;
const default_numbers = 5;
const default_mode = 2;

new Command()
  .name('passgen')
  .description(
    `Generate a random password
    modes:
      0: Numbers Only
      1: Letters Only
      2: Letters and Numbers
      3: Letters and Symbols(↓ & others)
      4: Letters and Symbols(.-_/)
      5: Capital Letters Only
      `,
  )
  .version('0.1.2')
  .option('-l, --length [length:number]', 'Length of the password', { default: default_length })
  .option('-n, --numbers [numbers:number]', 'Number of passwords to generate', { default: default_numbers })
  .option('-m, --mode <mode:number>', 'Type of password to generate', { default: default_mode })

  .action((options) => {
    const mode = Number(options.mode);
    // Check if the mode is valid
    if (mode < 0 || mode > 5) {
      console.log('Invalid mode');
      return;
    }
    Array.from({ length: Number(options.numbers) }).map(() => {
      // Length of the password
      const length = Number(options.length);

      // Type of password to generate
      switch (mode) {
        case 0: // Numbers Only
          console.log(gen(length, numbers));
          break;
        case 1: // Letters Only
          console.log(gen(length, lowercase + uppercase));
          break;
        case 2: // Letters and Numbers
          console.log(gen(length, lowercase + uppercase + numbers));
          break;
        case 3: // Letters and Symbols(loose)
          console.log(gen(length, lowercase + uppercase + numbers + loose_symbols));
          break;
        case 4: // Letters and Symbols(strict)
          console.log(gen(length, lowercase + uppercase + numbers + strict_symbols));
          break;
        case 5: // Capital Letters Only
          console.log(gen(length, uppercase));
          break;
        default:
          console.log('Invalid mode');
          break;
      }
    });
  })
  .parse(Deno.args);

const gen = (length: number, symbols: string): string => {
  return Array.from({ length }).map(() => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  ).join('');
};