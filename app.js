const express = require("express");

const ejs = require("ejs");

const fs = require("fs");

const natural = require("natural");

const { parse } = require("path");

const { r1 } = require("natural/lib/natural/stemmers/porter_stemmer_nl");
const app = express();
var tokenizer = new natural.WordTokenizer();
var tokenizer1 = new natural.SentenceTokenizer();
app.use(express.json());

app.set("view engine","ejs");
app.use(express.static('public'));

const PORT = process.env.PORT || 3000

app.listen(PORT);

app.get("/", (req,res)=>{
    res.render("index");
});
app.get("/search", (req,res)=>{
    const query = req.query;
    const question = query.question;
    k = fs.readFileSync("./data/keywords.txt").toString().split('\n');
    mag = fs.readFileSync("./data/magnitude.txt").toString().split('\n');
    idf = fs.readFileSync("./data/idf.txt").toString().split('\n');
    tfidf = fs.readFileSync("./data/tf_idf.txt").toString().split("\n");
    u = question.toString().split(" ");
    var ans = new Array(3263).fill(0);
    for(let it =0;it<Object.keys(u).length;it++)
    {
        u[it]=u[it].toLowerCase();
    }
      for(let it=0;it<3263;it++)
    {
        let a1=0;
        let a2=k[it].toString();
        for(it1=0;it1<Object.keys(u).length;it1++)
        {
           let a3=u[it1].toString();
           var a4=a2.slice(0,-1);
           if(a3==a4)
           {
               a1++;
           }
        }
        let a5 = (a1/(Object.keys(u).length))*parseFloat(idf[it]);
        ans[it]=a5;
    }
const N = 2585;
const  M = 3263;
let arr = new Array(N);
for (var i = 0; i < N; i++) {
  arr[i] = new Array(M).fill(0);
}
for(let it=0;it<397764;it+=3)
{
    var z1,z2,z3;
    z1=parseInt(tfidf[it]);
    z2=parseInt(tfidf[it+1]);
    z3=parseFloat(tfidf[it+2]);
    arr[z1-1][z2-1]=z3;
}
var qm=0;
for(let it=0;it<3263;it++)
{
    qm+=(ans[it]*ans[it]);
}
qm=Math.sqrt(qm);
var final=new Array(2585).fill(0);
for(var it=0;it<2585;it++)
{
    var temp=0;
    for(var it2=0;it2<3263;it2++)
    {
        temp+=(ans[it2]*arr[it][it2]);
    }
    var r1=qm;
    var r2=(parseFloat(mag[it]));
    var r3=(r1*r2);
    final[it]=((temp/r3));
}
const Nf = 2585;
const  Mf = 2;
let arrf = new Array(Nf);
for (var i = 0; i < Nf; i++) {
  arrf[i] = new Array(Mf).fill(0);
}
for(var i=0;i<2585;i++)
{
    arrf[i][0]=final[i];
    arrf[i][1]=i;
}
arrf.sort((a,b)=>b[0]-a[0]);
var r = new Array(10).fill(0);
for(let i=0;i<10;i++)
{
    r[i]=arrf[i][1];
}
var ttl = fs.readFileSync("./data/problem_title.text").toString().split("\n");
var ads = fs.readFileSync("./data/problem_url.text").toString().split("\n");
var qs = new Array(10);
for(var i=0;i<10;i++)
{
    qs[i] = fs.readFileSync(`./data/problem_no${r[i]+1}.txt`).toString();
    qs[i] = qs[i].substring(2);
    qs[i] = qs[i].slice(0,-1);
}

    setTimeout(()=>{
        const arr = [
            {
                title:ttl[r[0]],
                url:ads[r[0]],
                statement:qs[0],
            },
            {
                title:ttl[r[1]],
                url:ads[r[1]],
                statement:qs[1],
            },
            {
                title:ttl[r[2]],
                url:ads[r[2]],
                statement:qs[2]
            },
            {
                title:ttl[r[3]],
                url:ads[r[3]],
                statement:qs[3],
            },
            {
                title:ttl[r[4]],
                url:ads[r[4]],
                statement:qs[4],
            },
            {
                title:ttl[r[5]],
                url:ads[r[5]],
                statement:qs[5],
            },
            {
                title:ttl[r[6]],
                url:ads[r[6]],
                statement:qs[6],
            },
            {
                title:ttl[r[7]],
                url:ads[r[7]],
                statement:qs[7],
            },
            {
                title:ttl[r[8]],
                url:ads[r[8]],
                statement:qs[8],
            },
            {
                title:ttl[r[9]],
                url:ads[r[9]],
                statement:qs[9],
            },
        ];
        res.json(arr);
    },2000);

});