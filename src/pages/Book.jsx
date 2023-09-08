// pages/BookCreate.jsx

import { useState } from "react";
import axios from "axios";

export const Book = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState("");
  const [videos, setVideos] = useState([]); // 🔽 追加

  const getBooks = async (keyword) => {
    const url = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
    const result = await axios.get(`${url}${keyword}`);
    console.log(result.data);
    setBooks(result.data.items ?? []);
  };
    
 // 🔽 新しい関数追加
  const getRelatedVideos = async (title) => {
    const YOUTUBE_API_KEY = ""; 
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&type=video&q=${encodeURIComponent(title)}&key=${YOUTUBE_API_KEY}`;
    
    try {
      const result = await axios.get(url);
      setVideos(result.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };   

  // 🔽 追加
  const selectBook = (book) => {
      setBook(book.volumeInfo.title);
      getRelatedVideos(book.volumeInfo.title); // この行を追加
  };

  return (
    <>
      {/* 🔽 ここから追加 */}
      <table>
        <tbody>
          <tr>
            <th>読んだ本：</th>
            <td>{book}</td>
          </tr>
        </tbody>
      </table>
      {/* 🔼 ここまで追加 */}
      <p>キーワードで検索する</p>
      <input type="text" onChange={(e) => getBooks(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>書籍名</th>
            <th>出版社</th>
            <th>出版年</th>
            <th>リンク</th>
          </tr>
        </thead>
        <tbody>
          {books.map((x, i) => (
            <tr key={i}>
              <td>
                {/* 🔽 編集（onClick部分） */}
                <button type="button" onClick={() => selectBook(x)}>
                  選択
                </button>
              </td>
              <td>{x.volumeInfo.title}</td>
              <td>{x.volumeInfo.publisher}</td>
              <td>{x.volumeInfo.publishedDate}</td>
              <td>
                <a
                  href={x.volumeInfo.infoLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Link
                </a>
              </td>
            </tr>
          ))}
        </tbody>
          </table>
          {/* 🔽 関連動画の表示 */}
      <h3>関連動画</h3>
      <ul>
        {videos.map((video, i) => (
          <li key={i}>
            <iframe
              width="480"
              height="270"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <p>{video.snippet.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
