document.addEventListener("DOMContentLoaded", () => {
  // Create modal dynamically
  const modalHTML = `
            <div id="fontPreviewModal" class="modal" style="
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.5);
                justify-content: center;
                align-items: center;
            ">
                <div class="modal-content" style="
                    background-color: white;
                    padding: 30px;
                    border-radius: 10px;
                    width: 80%;
                    max-width: 600px;
                    max-height: 80%;
                    overflow-y: auto;
                ">
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    ">
                        <h2 id="modalFontName" style="font-size: 24px;"></h2>
                        <span id="closeModal" style="
                            cursor: pointer;
                            font-size: 30px;
                            font-weight: bold;
                        ">&times;</span>
                    </div>
                    <div>
                        <h3>Preview Sizes</h3>
                        <div id="modalFontPreview" style="margin-top: 15px;">
                            <p style="font-size: 16px;">Small Text: The quick brown fox jumps over the lazy dog</p>
                            <p style="font-size: 24px; margin-top: 10px;">Medium Text: The quick brown fox jumps over the lazy dog</p>
                            <p style="font-size: 36px; margin-top: 10px;">Large Text: The quick brown fox jumps over the lazy dog</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

  // Append modal to body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // DOM Elements
  const searchInput = document.getElementById("font-search");
  const fontsContainer = document.getElementById("fonts-container");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const modal = document.getElementById("fontPreviewModal");
  const closeModal = document.getElementById("closeModal");
  const modalFontName = document.getElementById("modalFontName");

  // Complete list of fonts
  const allFonts = [
    {
      name: "Poppins",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Montserrat",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');",
      sample: "Waltz nymphs fly by my crypt",
    },
    {
      name: "Merriweather",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Raleway",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');",
      sample: "Jinxed wizards pluck ivy from the big box",
    },
    {
      name: "Roboto Slab",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap');",
      sample: "Quick brown foxes jump over the lazy dog",
    },
    {
      name: "Playfair Display",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Source Sans Pro",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Nunito",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Oswald",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Lora",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');",
      sample: "Waltz nymphs fly by my crypt",
    },
    {
      name: "Cabin",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Karla",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');",
      sample: "Jinxed wizards pluck ivy from the big box",
    },
    {
      name: "Quicksand",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Varela Round",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Varela+Round:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Bitter",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Crimson Pro",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Fira Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Droid Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Droid+Sans:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Droid Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Droid+Serif:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "PT Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap');",
      sample: "Waltz nymphs fly by my crypt",
    },
    {
      name: "Bree Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bree+Serif:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Zilla Slab",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Oxygen",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Oxygen:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Slabo 27px",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Slabo+27px:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Vollkorn",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Vollkorn:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Anton",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Anton:wght@400;700&display=swap');",
      sample: "Jinxed wizards pluck ivy from the big box",
    },
    {
      name: "Amatic SC",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Bangers",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bangers:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Indie Flower",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Indie+Flower:wght@400;700&display=swap');",
      sample: "Waltz nymphs fly by my crypt",
    },
    {
      name: "Lobster",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lobster:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Pacifico",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Pacifico:wght@400;700&display=swap');",
      sample: "Jinxed wizards pluck ivy from the big box",
    },
    {
      name: "Shadows Into Light",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Sacramento",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Sacramento:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Archivo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap');",
      sample: "Waltz nymphs fly by my crypt",
    },
    {
      name: "Righteous",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Righteous:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Yeseva One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Yeseva+One:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Tangerine",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Arvo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Caveat",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');",
      sample: "Jinxed wizards pluck ivy from the big box",
    },
    {
      name: "Kite One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Kite+One:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Rock Salt",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Rock+Salt:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Baloo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Baloo:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Dancing Script",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Lobster Two",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lobster+Two:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Eater",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Eater:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Staatliches",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Staatliches:wght@400;700&display=swap');",
      sample: "Waltz nymphs fly by my crypt",
    },
    {
      name: "Anton",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Anton:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Bubblegum Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Courgette",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Courgette:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Droid Sans Mono",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Droid+Sans+Mono:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Fredericka the Great",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Teko",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Mochiy Pop P One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Muli",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Muli:wght@400;700&display=swap');",
      sample: "Waltz nymphs fly by my crypt",
    },
    {
      name: "Sunshiney",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Sunshiney:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Chivo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Chivo:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Quattrocento",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Rufina",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Rufina:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Zilla Slab Highlight",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab+Highlight:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Russo One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Russo+One:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Bitter",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Lobster",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lobster:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Noto Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Lora",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');",
      sample: "Waltz nymphs fly by my crypt",
    },
    {
      name: "Lobster Two",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lobster+Two:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Oswald",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Quicksand",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Tisa",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Tisa:wght@400;700&display=swap');",
      sample: "Jinxed wizards pluck ivy from the big box",
    },
    {
      name: "Merriweather Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Tisa Web",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Tisa+Web:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Viga",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Viga:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Rubik",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Fugaz One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fugaz+One:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Piedra",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Piedra:wght@400;700&display=swap');",
      sample: "Waltz nymphs fly by my crypt",
    },
    {
      name: "Black Ops One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Prata",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Prata:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Sanchez",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Sanchez:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Pinyon Script",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Pinyon+Script:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Lobster Two",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lobster+Two:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Changa",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Changa:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Kalam",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Bree",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bree:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Hind",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Hind:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Vollkorn SC",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Vollkorn+SC:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Exo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Exo:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Baloo 2",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Fira Code",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Alfa Slab One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Antic Slab",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Antic+Slab:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Bebas Neue",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Big Shoulders Display",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Bitter",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Bree Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bree+Serif:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Cabin",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;700&display=swap');",
      sample: "Waltz nymphs fly by my crypt",
    },
    {
      name: "Candal",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Candal:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Cinzel",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Cinzel Decorative",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Coda",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Coda:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Comfortaa",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Cormorant Garamond",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Dancing Script",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Darker Grotesque",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Dawning of a New Day",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Dawning+of+a+New+Day:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Exo 2",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Fira Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Francois One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Francois+One:wght@400;700&display=swap');",
      sample: "Waltz nymphs fly by my crypt",
    },
    {
      name: "Gloock",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gloock:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Great Vibes",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Great+Vibes:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Hind Vadodara",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Julius Sans One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Kanit",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Karla",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Lobster",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lobster:wght@400;700&display=swap');",
      sample: "Waltz nymphs fly by my crypt",
    },
    {
      name: "Maitree",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Mandali",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Mandali:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Merriweather",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Monoton",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Monoton:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Mountains of Christmas",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Nunito Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Old Standard TT",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Open Sans Condensed",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Oswald",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Playfair Display",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Poppins",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Potta One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Potta+One:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Rasa",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Rasa:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Righteous",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Righteous:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Roboto Mono",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Sacramento",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Sacramento:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Slabo 27px",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Slabo+27px:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Shadows Into Light",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Shanti",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Shanti:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Sigmar One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Sigmar+One:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Sofia",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Sofia:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Space Mono",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Spinnaker",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Spinnaker:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Spirax",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Spirax:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Tangerine",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Teko",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Timmana",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Timmana:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Ubuntu",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Varela Round",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Varela+Round:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Volkorn",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Vollkorn:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Wire One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Wire+One:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Yeseva One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Yeseva+One:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Zilla Slab",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Alegreya",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Arvo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Asap",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Asap:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Bangers",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bangers:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Bitter",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Bree Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bree+Serif:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Carme",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Carme:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Cinzel",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Coda",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Coda:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Dancing Script",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Didact Gothic",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Didact+Gothic:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Domine",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Domine:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Droid Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Droid+Serif:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Exo 2",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Fira Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Gloock",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gloock:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Hind Vadodara",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Julius Sans One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Karla",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Lobster",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lobster:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Maitree",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Mandali",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Mandali:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Merriweather",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Muli",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Muli:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Neuton",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Neuton:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Noto Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Noto Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Nunito",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Oxygen",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Oxygen:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Play",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Poppins",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Press Start 2P",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Quicksand",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Roboto Condensed",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Roboto Slab",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Rufina",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Rufina:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Saira",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Saira:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Sarabun",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Sevillana",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Sevillana:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Sigmar One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Sigmar+One:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Slackey",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Slackey:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Source Code Pro",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Space Mono",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Spectral",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Spectral:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Spinnaker",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Spinnaker:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Teko",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Varela Round",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Varela+Round:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Zilla Slab",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Alegreya",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Arvo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Asap",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Asap:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Bangers",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bangers:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Bitter",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Bree Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bree+Serif:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Carme",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Carme:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Cinzel",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Coda",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Coda:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Dancing Script",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Didact Gothic",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Didact+Gothic:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Domine",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Domine:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Droid Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Droid+Serif:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },

    {
      name: "Exo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Exo:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Fira Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Gabriela",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gabriela:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Gloock",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gloock:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Gloria Hallelujah",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Gochi Hand",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Grand Hotel",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Hind",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Hind:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Hind Guntur",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Hind+Guntur:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Homemade Apple",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Homemade+Apple:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Inconsolata",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Indie Flower",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Indie+Flower:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Ibarra Real Nova",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "IM Fell English",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Julius Sans One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Karla",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Lobster",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lobster:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Lora",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Lustria",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lustria:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Maitree",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Mandali",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Mandali:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Merriweather",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Montserrat",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Noto Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Open Sans Condensed",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Oswald",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Overpass",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Overpass:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Poppins",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Quicksand",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Raleway",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Red Hat Display",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Roboto Flex",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Saira",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Saira:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Source Serif Pro",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Spinnaker",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Spinnaker:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Zilla Slab",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "ABeeZee",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=ABeeZee:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Alegreya Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Allura",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Allura:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Amatic SC",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Anton",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Anton:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Bai Jamjuree",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Baloo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Baloo:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Bangers",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bangers:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Barlow",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Bitter",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Bree Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bree+Serif:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Cabin",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Cairo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Candal",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Candal:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Carrois Gothic",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Carrois+Gothic:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Chivo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Chivo:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Cinzel Decorative",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Cloudinary",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cloudinary:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Cormorant",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Cousine",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cousine:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Crimson Pro",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Darker Grotesque",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Dawning of a New Day",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Dawning+of+a+New+Day:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Droid Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Droid+Sans:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Duru Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Duru+Sans:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Economica",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Economica:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "El Messiri",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Expletus Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Expletus+Sans:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Fira Code",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Fira Mono",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Garamond",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Garamond:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Gloock",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gloock:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Gloria Hallelujah",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Gochi Hand",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Grand Hotel",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Hind",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Hind:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Hind Guntur",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Hind+Guntur:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Homemade Apple",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Homemade+Apple:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "IBM Plex Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "IM Fell French Canon",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=IM+Fell+French+Canon:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Inika",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Inika:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Julius Sans One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Karla",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Lobster",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lobster:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Lora",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Lustria",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lustria:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Maitree",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Mandali",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Mandali:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Merriweather",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Montserrat",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Noto Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Open Sans Condensed",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Oswald",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Overpass",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Overpass:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Poppins",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Quicksand",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');",
      sample: "Sphinx of black quartz, judge my vow",
    },
    {
      name: "Raleway",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Red Hat Display",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Roboto Flex",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Saira",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Saira:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Source Serif Pro",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Spinnaker",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Spinnaker:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Zilla Slab",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Arimo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Averia Sans Libre",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Averia+Sans+Libre:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Droid Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Droid+Serif:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Playfair Display",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Patua One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Patua+One:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Proza Libre",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Proza+Libre:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Quattrocento",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Varela Round",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Varela+Round:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Viga",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Viga:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Wendy One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Wendy+One:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Zilla Slab Highlight",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab+Highlight:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Monda",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Monda:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Caveat",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Andika",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Andika:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Abel",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Abel:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Alegreya",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Arvo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Balsamiq Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Bangers",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bangers:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Bree Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bree+Serif:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Bubblgum",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bubblgum:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Cabin Condensed",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cabin+Condensed:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Cairo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Chivo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Chivo:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Cinzel",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Coda",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Coda:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Comfortaa",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Creepster",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Creepster:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Dancing Script",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Darker Grotesque",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Droid Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Droid+Sans:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Droid Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Droid+Serif:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Duru Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Duru+Sans:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Exo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Exo:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Fira Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Garamond",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Garamond:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Gloock",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gloock:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Gloria Hallelujah",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Gochi Hand",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Grand Hotel",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Hind",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Hind:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Homemade Apple",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Homemade+Apple:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "IBM Plex Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Indie Flower",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Indie+Flower:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Julius Sans One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Karla",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Lobster",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lobster:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Lora",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Lustria",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lustria:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Maitree",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Mandali",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Mandali:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Merriweather",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Montserrat",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Noto Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Oxygen",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Oxygen:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Pacifico",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Pacifico:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Play",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Poppins",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Quicksand",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Raleway",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Righteous",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Righteous:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Roboto",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Satisfy",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Satisfy:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Shadows Into Light",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Sigmar One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Sigmar+One:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Spartan",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Spartan:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Sunshiney",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Sunshiney:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Tangerine",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Titillium Web",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Trirong",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Trirong:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Ubuntu",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Ultra",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Ultra:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Unna",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Unna:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Varela Round",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Varela+Round:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Viga",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Viga:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Volkhov",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Volkhov:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Vollkorn",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Vollkorn:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Work Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Yeseva One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Yeseva+One:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Zilla Slab",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Arimo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Audiowide",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Audiowide:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Be Vietnam",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Bitter",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Bree Serif",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bree+Serif:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Cabin",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Cinzel Decorative",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Cormorant",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Arbutus Slab",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Arbutus+Slab:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Barlow",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Beau Rivage",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Beau+Rivage:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Bebas Neue",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Cabin Sketch",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Changa",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Changa:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Chau Philomene One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Chau+Philomene+One:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Cousine",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cousine:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Darker Grotesque",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Dela Gothic One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Do Hyeon",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Domine",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Domine:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Exo 2",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Federo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Federo:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Fira Code",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Fredoka One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Glegoo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Glegoo:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Gravitas One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gravitas+One:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Hammersmith One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Inder",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Inder:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Julius Sans One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Kameron",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Kameron:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Karla",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Lora",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Mali",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Mali:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Maven Pro",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Merienda",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Merienda:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Mitr",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Mitr:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Monoton",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Monoton:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Muli",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Muli:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Neuton",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Neuton:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Open Sans Condensed",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Oswald",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Oxygen",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Oxygen:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "PT Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Arbutus Slab",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Arbutus+Slab:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Barlow",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Beau Rivage",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Beau+Rivage:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Bebas Neue",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Cabin Sketch",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Changa",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Changa:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Chau Philomene One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Chau+Philomene+One:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Cousine",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Cousine:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Darker Grotesque",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Dela Gothic One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Do Hyeon",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Domine",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Domine:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Exo 2",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Federo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Federo:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Fira Code",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Fredoka One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Glegoo",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Glegoo:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Gravitas One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Gravitas+One:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Hammersmith One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Inder",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Inder:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Julius Sans One",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Kameron",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Kameron:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Karla",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Lora",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Mali",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Mali:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Maven Pro",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Merienda",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Merienda:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Mitr",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Mitr:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Monoton",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Monoton:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "Muli",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Muli:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
    {
      name: "Neuton",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Neuton:wght@400;700&display=swap');",
      sample: "The quick brown fox jumps over the lazy dog",
    },
    {
      name: "Open Sans Condensed",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@400;700&display=swap');",
      sample: "Pack my box with five dozen liquor jugs",
    },
    {
      name: "Oswald",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');",
      sample: "Quick zephyrs blow, vexing daft Jim",
    },
    {
      name: "Oxygen",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Oxygen:wght@400;700&display=swap');",
      sample: "The five boxing wizards jump quickly",
    },
    {
      name: "PT Sans",
      import:
        "@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');",
      sample: "Jumping squirrels vex bold wizard",
    },
  ];

  let displayedFontsCount = 12;
  let currentFonts = allFonts.slice(0, displayedFontsCount);

  // Handle Copy Import Functionality
  function handleCopyImport(copyBtn) {
    const importText = copyBtn.getAttribute("data-import");

    // Copy to clipboard
    navigator.clipboard
      .writeText(importText)
      .then(() => {
        // Store original content
        const originalContent = copyBtn.innerHTML;

        // Change button state
        copyBtn.innerHTML = `<i class="fas fa-check"></i> Copied!`;
        copyBtn.classList.add("copied");

        // Create toast notification
        const toast = document.createElement("div");
        toast.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background-color: #2ecc71;
                    color: white;
                    padding: 15px 30px;
                    border-radius: 5px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    z-index: 1000;
                    animation: fadeInOut 3s ease-in-out;
                `;
        toast.textContent = "Font import link copied successfully!";
        document.body.appendChild(toast);

        // Add animation keyframes
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
                    @keyframes fadeInOut {
                        0%, 100% { opacity: 0; transform: translateX(100%); }
                        10%, 90% { opacity: 1; transform: translateX(0); }
                    }
                `;
        document.head.appendChild(styleSheet);

        // Revert button after 3 seconds
        setTimeout(() => {
          copyBtn.innerHTML = originalContent;
          copyBtn.classList.remove("copied");
          document.body.removeChild(toast);

          // Remove the dynamically added style
          document.head.removeChild(styleSheet);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  // Event listener for font container
  fontsContainer.addEventListener("click", (e) => {
    // Preview button logic
    const previewBtn = e.target.closest(".preview-btn");
    if (previewBtn) {
      const fontName = previewBtn.getAttribute("data-font");
      const fontImport = previewBtn.getAttribute("data-import");

      // Update modal content
      modalFontName.textContent = fontName;

      // Apply font to preview texts
      const previewTexts = modal.querySelectorAll("#modalFontPreview p");
      previewTexts.forEach((text) => {
        text.style.fontFamily = fontName;
      });

      // Create and inject font import style
      const existingStyle = document.getElementById("preview-font-style");
      if (existingStyle) {
        existingStyle.remove();
      }

      const styleTag = document.createElement("style");
      styleTag.id = "preview-font-style";
      styleTag.textContent = fontImport;
      document.head.appendChild(styleTag);

      // Show modal
      modal.style.display = "flex";
    }

    // Copy import button logic
    const copyBtn = e.target.closest(".copy-btn");
    if (copyBtn) {
      handleCopyImport(copyBtn);
    }
  });

  // Close modal functionality
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Load more fonts functionality
  loadMoreBtn.addEventListener("click", () => {
    displayedFontsCount += 12;
    currentFonts = allFonts.slice(0, displayedFontsCount);
    renderFonts();
  });

  function renderFonts() {
    fontsContainer.innerHTML = "";
    currentFonts.forEach((font) => {
      const fontCard = document.createElement("div");
      fontCard.className = "font-card fade-in";
      fontCard.innerHTML = `
                  <div class="font-preview">
                      <div class="font-name">${font.name}</div>
                      <div class="font-sample" style="font-family: ${font.name};">
                          ${font.sample}
                      </div>
                  </div>
                  <div class="font-actions">
                      <button class="preview-btn" data-font="${font.name}" data-import="${font.import}">
                          <i class="fas fa-eye"></i> Preview
                      </button>
                      <button class="copy-btn" data-import="${font.import}">
                          <i class="fas fa-copy"></i> Copy
                      </button>
                  </div>
              `;
      fontsContainer.appendChild(fontCard);
    });

    // Show/hide load more button
    loadMoreBtn.style.display =
      displayedFontsCount >= allFonts.length ? "none" : "block";
  }

  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
  });

  // Filter fonts based on search input
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    currentFonts = allFonts.filter((font) =>
      font.name.toLowerCase().includes(query)
    );
    renderFonts();
  });

  // Initial render
  renderFonts();
});

const quotes = [
  {
    text: "Knowledge is better than wealth. Knowledge guards you, while you have to guard wealth.",
    author: "Hazrat Ali (a.s.)",
    profession: "Islamic Scholar",
    avatar:
      "https://i.pinimg.com/474x/53/a6/a7/53a6a723982ef66ac2ec422cb42fa000.jpg",
  },
  {
    text: "He who does not have forbearance, will not be able to make progress.",
    author: "Hazrat Ali (a.s.)",
    profession: "Islamic Scholar",
    avatar:
      "https://i.pinimg.com/474x/55/62/0b/55620b48b39cc0ad9cd30850606b221f.jpg",
  },
  {
    text: "Your remedy is within you, but you do not see it. Your sickness is from you, but you do not observe it.",
    author: "Hazrat Ali (a.s.)",
    profession: "Islamic Scholar",
    avatar:
      "https://i.pinimg.com/474x/e3/17/ee/e317ee3795f8c31eb38d9e89864fa7ce.jpg",
  },
  {
    text: "Silence is the best reply to a fool.",
    author: "Hazrat Ali (a.s.)",
    profession: "Islamic Scholar",
    avatar:
      "https://i.pinimg.com/736x/38/4f/d7/384fd7b40f348680468e913bfe5d4a26.jpg",
  },
  {
    text: "People are slaves to this world as long as they seek it, but when tested by adversity, they become the slaves of their deeds.",
    author: "Hazrat Ali (a.s.)",
    profession: "Islamic Scholar",
    avatar:
      "https://i.pinimg.com/1200x/ca/10/12/ca101257d125d05392070e6a1a1cff42.jpg",
  },
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
    profession: "Apple Co-Founder",
    avatar:
      "https://i.pinimg.com/474x/51/4c/bf/514cbf5546af55248d06fe2d7e3c7dbd.jpg",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    profession: "Renaissance Polymath",
    avatar:
      "https://i.pinimg.com/474x/54/04/c0/5404c0a0a8992b6632d2a22654052f20.jpg",
  },
];

class QuoteRotator {
  constructor(quotes) {
    this.quotes = quotes;
    this.currentIndex = 0;
    this.quoteText = document.getElementById("quote-text");
    this.authorName = document.getElementById("quote-author");
    this.authorProfession = document.getElementById("author-profession");
    this.authorAvatar = document.getElementById("author-avatar");
    this.progressBar = document.getElementById("quote-progress");
    this.rotationInterval = 5000; // 5 seconds
  }

  displayQuote(quote) {
    // Clear previous animation
    this.quoteText.innerHTML = "";

    // Animate text letter by letter
    quote.text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animationDelay = `${index * 30}ms`;
      span.classList.add("letter-animate");
      this.quoteText.appendChild(span);
    });

    this.authorName.textContent = quote.author;
    this.authorProfession.textContent = quote.profession;
    this.authorAvatar.src = quote.avatar;
    this.authorAvatar.alt = quote.author;
  }

  startRotation() {
    const rotateQuote = () => {
      // Increment index
      this.currentIndex = (this.currentIndex + 1) % this.quotes.length;

      // Display next quote
      this.displayQuote(this.quotes[this.currentIndex]);

      // Animate progress bar
      this.animateProgressBar();
    };

    // Initial quote
    this.displayQuote(this.quotes[this.currentIndex]);
    this.animateProgressBar();

    // Set interval for quote rotation
    this.intervalId = setInterval(rotateQuote, this.rotationInterval);
  }

  animateProgressBar() {
    this.progressBar.style.width = "0%";
    this.progressBar.style.transition = `width ${this.rotationInterval}ms linear`;

    // Trigger reflow
    this.progressBar.offsetWidth;

    this.progressBar.style.width = "100%";
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

// Initialize quote rotator on DOM load
document.addEventListener("DOMContentLoaded", () => {
  const quoteRotator = new QuoteRotator(quotes);
  quoteRotator.startRotation();
});
