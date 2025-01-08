// PromiseExample.js - Kapsamlı Promise Örneği ve Açıklamaları

import React, { useState, useEffect } from 'react';

function PromiseExample() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ÖRNEK 1: Temel Promise Oluşturma
  // Promise constructor'ı iki parametre alır: resolve (başarı) ve reject (hata)
  const basicPromise = new Promise((resolve, reject) => {
    // Promise içinde asenkron bir işlem simüle ediyoruz
    setTimeout(() => {
      const success = true; // Bu değeri false yaparak reject durumunu test edebilirsiniz
      
      if (success) {
        resolve("İşlem başarılı!"); // Başarılı durumda resolve çağrılır
      } else {
        reject(new Error("Bir hata oluştu!")); // Hata durumunda reject çağrılır
      }
    }, 2000); // 2 saniye gecikme
  });

  // ÖRNEK 2: Promise Chain (Promise Zinciri)
  // then() metodları ile zincirleme işlemler yapılabilir
  const chainExample = () => {
    setLoading(true);
    setError(null);

    // İç içe Promise kullanımı yerine chain yapısı kullanılır
    fetchUser(1)                    // İlk Promise: Kullanıcı bilgilerini getir
      .then(user => {
        setResult(prev => prev + `\nKullanıcı bulundu: ${user.name}`);
        return fetchUserPosts(user.id); // İkinci Promise: Kullanıcının postlarını getir
      })
      .then(posts => {
        setResult(prev => prev + `\nPost sayısı: ${posts.length}`);
        return fetchPostComments(posts[0].id); // Üçüncü Promise: İlk postun yorumlarını getir
      })
      .then(comments => {
        setResult(prev => prev + `\nYorum sayısı: ${comments.length}`);
      })
      .catch(error => {             // Herhangi bir aşamada hata olursa catch bloğu çalışır
        setError(`Hata oluştu: ${error.message}`);
      })
      .finally(() => {             // Her durumda finally bloğu çalışır
        setLoading(false);
      });
  };

  // ÖRNEK 3: Promise.all() Kullanımı
  // Birden fazla Promise'i paralel olarak çalıştırma
  const parallelExample = () => {
    setLoading(true);
    setError(null);

    // Tüm Promise'ler paralel olarak çalışır
    Promise.all([
      fetchUser(1),              // Promise 1
      fetchUserPosts(1),         // Promise 2
      fetchPostComments(1)       // Promise 3
    ])
      .then(([user, posts, comments]) => {
        // Tüm Promise'ler tamamlandığında çalışır
        setResult(`
          Kullanıcı: ${user.name}
          Post Sayısı: ${posts.length}
          Yorum Sayısı: ${comments.length}
        `);
      })
      .catch(error => {
        // Herhangi bir Promise hata verirse catch çalışır
        setError(`Parallel işlemde hata: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ÖRNEK 4: async/await Kullanımı
  // Promise'leri daha okunabilir şekilde kullanma
  const asyncExample = async () => {
    setLoading(true);
    setError(null);

    try {
      // await ile Promise'in tamamlanması beklenir
      const user = await fetchUser(1);
      setResult(`Kullanıcı: ${user.name}`);

      const posts = await fetchUserPosts(user.id);
      setResult(prev => prev + `\nPost Sayısı: ${posts.length}`);

      const comments = await fetchPostComments(posts[0].id);
      setResult(prev => prev + `\nYorum Sayısı: ${comments.length}`);
    } catch (error) {
      // try/catch ile hata yakalama
      setError(`Async işlemde hata: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Mock API çağrıları (Promise döndüren fonksiyonlar)
  const fetchUser = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ id, name: 'John Doe' });
      }, 1000);
    });
  };

  const fetchUserPosts = (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Post 1' },
          { id: 2, title: 'Post 2' }
        ]);
      }, 1000);
    });
  };

  const fetchPostComments = (postId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { id: 1, text: 'Comment 1' },
          { id: 2, text: 'Comment 2' }
        ]);
      }, 1000);
    });
  };

  return (
    <div className="promise-example">
      <h2>Promise Örnekleri</h2>
      
      <div className="buttons">
        <button onClick={() => chainExample()}>Promise Chain</button>
        <button onClick={() => parallelExample()}>Promise.all</button>
        <button onClick={() => asyncExample()}>Async/Await</button>
      </div>

      {loading && <div className="loading">Yükleniyor...</div>}
      {error && <div className="error">{error}</div>}
      {result && <pre className="result">{result}</pre>}

      <div className="explanation">
        <h3>Önemli Noktalar:</h3>
        <ul>
          <li>Promise üç durumda olabilir: pending (bekliyor), fulfilled (başarılı), rejected (hata)</li>
          <li>then() metodu Promise zinciri oluşturmak için kullanılır</li>
          <li>catch() metodu hataları yakalamak için kullanılır</li>
          <li>finally() metodu her durumda çalışır</li>
          <li>Promise.all() birden fazla Promise'i paralel çalıştırır</li>
          <li>async/await, Promise'leri daha okunabilir şekilde kullanmamızı sağlar</li>
        </ul>
      </div>
    </div>
  );
}

export default PromiseExample; 