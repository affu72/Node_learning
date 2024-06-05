const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (fileName)=>{
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) reject('Hello there');
      resolve(data);
    });
  })
}

const writeFilePro = (fileName,data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject("Got rejected");
      resolve('success');
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`)
//   .then(data => {
//    console.log(data)
//   }).catch(err => {
//   console.log(err)
// })

// writeFilePro('hello.txt', "abc").then(data => {
//   console.log(data);
// })

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  })
  .then(res => {
    return writeFilePro('dogImg.txt', res.body.message)
  })
  .then(() => {
    console.log("dog is added")
  })
  .catch((err) => {
    console.log(err);
  });
  */

// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//       console.log(res.body.message)
//       fs.writeFile('dog-img.txt', res.body.message, () => {
//         console.log('saved');
//       });
//     }).catch(err => {
//       console.log(err.message);
//     })
// });


//ASYNC AWAIT

const getDogPic = async () => {
  try {
    const breed = await readFilePro(`${__dirname}/dog.txt`);

    // console.log(breed);

    /* PARALLEL PROMISE */
    /* The way we are handling the promise is, it will run one by one and wait for the result to come,
      //but we can run them parallel using  PROMISE.ALL*/

    // const res = await superagent.get(
    //   `https://dog.ceo/api/breed/${breed}/images/random`
    // );
    
    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );


    const res2 =  superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    const res3 = await superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    const allImages = await Promise.all([res1, res2, res3]);

    console.log(allImages)

    const imageLinks = allImages.map(img=>img.body.message)

    console.log(imageLinks)

    // console.log(res.body.message);

    await writeFilePro('dogImg.txt', imageLinks.join('\n'));

    console.log('last me hun ');
  } catch (err) {
    console.log(err.message);
    throw err; //throw error so that promise will be rejected
  }

  return "will return the value"
}
/*
console.log("before fn called")
// const x = getDogPic();
// console.log(x);


//resolving promise using then
getDogPic().then(res => {
  console.log(res);
})
console.log('after fn called');
*/

//resolving promise using async await | IIFE

(async () => {
  try {
    console.log(await getDogPic())
  } catch (err) {
    console.log(err)
  }
})()


