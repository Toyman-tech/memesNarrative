
import {  NextResponse } from 'next/server';
import { GoogleGenerativeAI }  from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(`${process.env.NEXT_API_KEY}`);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
// const genAI = new GoogleGenerativeAI('AIzaSyAGmJtgcEKEpFu6FdFx8QKoNFbvzX0XCKw')

//dummy function to get naratives
async function fetchNarative(coin: string): Promise<string>{
    // const naratives = [
    //     `${coin} is going to the moon! Don't miss out! #crpto #Altcoin`,
    //     `${coin} is on the fire! Get in now before it's too late! #Crypto #HODL `,
    //     `Hands strong! ${coin} is the next big thing! #Crtpto #Altcoin`,
    // ]
    // const randomNarative = naratives[Math.floor(Math.random() * naratives.length)];
    // console.log(randomNarative)
// prompt ai 
const prompt = `Write a short and nice narrative suitable for a tweeter post to shill ${coin} which is a memcoin that has a strong potential and ready to moon, dont add a pro tip or any Note message`
  
const result = await model.generateContent(prompt);
const response = await result.response;
const randomNarative = response.text();
console.log(randomNarative);

    return randomNarative;
}

export  async function  POST(req: Request){
//    const coin = req. ;
//    console.log('you are in')
//    console.log(req)
//    if(!coin){
//       return NextResponse.json({ error: 'Missing required fields' } );   
//       console.log('nonee')
//     };
    try {
      const narative = await fetchNarative('$MELLOW');  

      const data:any = await narative;
     return  NextResponse.json({ success: true, data: narative }, {status : 200});
        // console.log('congrats')
    } catch (error) {
       return NextResponse.json({ success: false }, {status: 400});
    }

}

// async function run(coin : string) {
//     const prompt = "Write a nice narrative suitable for a tweeter post on $MOON which is a memcoin that has a strong potential and ready to moon"
  
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//   }
  
//   run('$MOON');