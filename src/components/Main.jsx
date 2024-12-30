import { useEffect } from "react";
import { useState } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  function handleClick(event) {
    const { value, name } = event.currentTarget;
    setMeme((prev) => ({ ...prev, [name]: value }));
  }

  const [images, setImages] = useState({});

  useEffect(() => {
    fetch(`https://api.imgflip.com/get_memes`)
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  function getImage() {
    const number = Math.floor(Math.random() * images.data.memes.length);
    setMeme((prev) => ({
      ...prev,
      imageUrl: images.data.memes[number].url,
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            onChange={handleClick}
            value={meme.topText}
            type="text"
            placeholder="One does not simply"
            name="topText"
          />
        </label>

        <label>
          Bottom Text
          <input
            onChange={handleClick}
            value={meme.bottomText}
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
          />
        </label>
        <button onClick={getImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
