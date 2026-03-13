import { Category } from '@/types'

export const categories: Category[] = [
  {
    slug: 'gummies',
    name: 'Gummies',
    description: 'Swedish gummies are softer, fruitier, and more flavorful than most American brands — discover the difference.',
    longDescription: "Swedish gummy candy represents the pinnacle of Scandinavian confectionery craft. Unlike mass-market American gummies that often rely on artificial flavors and waxy textures, Swedish gummies use natural fruit juices and a softer gelatin base that creates a more satisfying chew. Brands like BUBS, Malaco, and Fazer produce gummies in an astonishing variety of shapes, flavors, and textures — from sour skulls to tropical fish to mixed fruit assortments. Whether you prefer sweet, sour, or something in between, Swedish gummies deliver.",
    image: '/images/candy/bubs-sour-skulls.jpg',
    candySlugs: ['bubs-sour-skulls', 'bubs-watermelon', 'bubs-cool-cola', 'ahlgrens-bilar', 'malaco-gott-och-blandat', 'tutti-frutti', 'swedish-fish'],
  },
  {
    slug: 'chocolate',
    name: 'Chocolate',
    description: 'Scandinavian chocolate is made with Nordic dairy and tastes nothing like American chocolate. Prepare to be converted.',
    longDescription: "If you think you know milk chocolate, Swedish and Scandinavian chocolate will reset your expectations entirely. Made with high-fat Nordic dairy, Swedish chocolate is creamier, smoother, and richer than most American and even many European chocolates. Marabou, Cloetta, and Fazer dominate the market with bars, pralines, and filled chocolates that range from simple milk chocolate to complex combinations with toffee, wafer, and nuts. Once you try Marabou Mjölkchoklad or Fazer Blue, going back to Hershey's becomes difficult.",
    image: '/images/candy/marabou-mjolkchoklad.jpg',
    candySlugs: ['marabou-mjolkchoklad', 'daim', 'fazer-blue', 'polly', 'plopp', 'kexchoklad', 'center', 'marianne'],
  },
  {
    slug: 'sour',
    name: 'Sour Candy',
    description: 'Swedish sour candy hits different — bolder flavors, better textures, and the perfect balance of sour and sweet.',
    longDescription: "Swedish sour candy has experienced a global renaissance thanks to TikTok. Brands like BUBS have mastered the art of the sour coating — intense enough to make your mouth pucker, but balanced with enough sweetness that you keep reaching for more. The key difference from American sour candy is the quality of the sour: Swedish brands use citric acid blends that create a cleaner, more natural sour taste rather than the chemical burn you sometimes get with American brands. The gummy textures are also superior — firmer, chewier, and more satisfying.",
    image: '/images/candy/bubs-sour-skulls.jpg',
    candySlugs: ['bubs-sour-skulls', 'bubs-watermelon', 'bubs-cool-cola'],
  },
  {
    slug: 'licorice',
    name: 'Licorice',
    description: "Scandinavians are obsessed with licorice — from mild and sweet to intensely salty. Here's your guide to all of it.",
    longDescription: "Licorice is where Swedish candy culture diverges most dramatically from American tastes. While Americans generally know licorice only as the sweet, red Twizzlers variety, Scandinavians consume licorice across an entire spectrum — from sweet and mild (like Skipper's Pipes) to moderately salty to extremely intense salmiak. In Sweden, licorice isn't just a candy flavor; it's a cultural institution. Understanding and appreciating Swedish licorice is the true test of candy adventurousness.",
    image: '/images/candy/skippers-pipes.jpg',
    candySlugs: ['skipper-pipes', 'lakerol', 'bubs-raspberry-licorice', 'malaco-gott-och-blandat'],
  },
  {
    slug: 'salmiak',
    name: 'Salmiak',
    description: "The most polarizing candy on Earth — salty ammonium chloride licorice that Scandinavians can't live without.",
    longDescription: "Salmiak is the final boss of Swedish candy. Named after sal ammoniac (ammonium chloride), salmiak candy combines licorice with a salty, almost electric mineral taste that creates an intense sensation unlike anything else in confectionery. Most Americans who try it for the first time react with genuine shock — but given a few attempts, many develop a genuine craving. In Scandinavia, salmiak is mainstream: it appears in candy, ice cream, liquor (salmiakki), and even as a pizza topping. If you want the most authentic Swedish candy experience, you have to at least try it.",
    image: '/images/candy/djungelvraal.jpg',
    candySlugs: ['djungelvraal', 'saltlakrits'],
  },
  {
    slug: 'classic',
    name: 'Swedish Classics',
    description: 'The timeless favorites that every Swede grew up with — the essential starting point for Swedish candy newcomers.',
    longDescription: "These are the candies that define Swedish confectionery culture — the ones that every Swede has eaten thousands of and can identify blindfolded. From Ahlgrens Bilar to Marabou chocolate to Daim bars, these classics have been staples of Swedish candy aisles for decades. If you're new to Swedish candy, start here. These are the safe, universally loved choices that will give you a solid foundation before you venture into the more adventurous territory of salmiak and intense licorice.",
    image: '/images/candy/ahlgrens-bilar.jpg',
    candySlugs: ['ahlgrens-bilar', 'marabou-mjolkchoklad', 'daim', 'kexchoklad', 'plopp', 'swedish-fish'],
  },
]
