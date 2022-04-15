// Require Express.js
const express = require('express')
const app = express()

var arg = require('minimist')(process.argv.slice(2))
// Start an app server
const port =  arg.port||process.env.PORT|| 5000

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});


//200 Status code
app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });
//normal flip
app.get('/app/flip/', (req, res) => {
    res.send(coinFlip())
    });
//Guess
app.get('/app/flip/call/:guess', (req, res) => {
    const val = flipACoin(req.params.guess)
    res.json(val)
    });
//Return number flips
app.get('/app/flips/:num', (req, res) => {
    const flips = manyflips(req.params.number)
    res.json(flips)
    });

/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

function coinFlip() {
    const value = Math.floor(Math.random() * 2);
    if(value == 0){
      return "heads";
    }
    return "tails";
  }
  
  /** Multiple coin flips
   * 
   * Write a function that accepts one parameter (number of flips) and returns an array of 
   * resulting "heads" or "tails".
   * 
   * @param {number} flips 
   * @returns {string[]} results
   * 
   * example: coinFlips(10)
   * returns:
   *  [
        'heads', 'heads',
        'heads', 'tails',
        'heads', 'tails',
        'tails', 'heads',
        'tails', 'heads'
      ]
   */
  
function coinFlips(flips) {
    let array = [];
    for(let i = 0; i < flips; i++){
    array[i] = conFlip();
    }
    return array;
  }
  
  /** Count multiple flips
   * 
   * Write a function that accepts an array consisting of "heads" or "tails" 
   * (e.g. the results of your `coinFlips()` function) and counts each, returning 
   * an object containing the number of each.
   * 
   * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
   * { tails: 5, heads: 5 }
   * 
   * @param {string[]} array 
   * @returns {{ heads: number, tails: number }}
   */
  
function countFlips(array) {
    let counter = 0;
    for(let i = 0; i < array.length; i++){
      if(array[i] == "Heads"){
        counter = counter + 1;
      }
  
    return {tails: array.length - counter, heads: counter}};
  
  }
  
  /** Flip a coin!
   * 
   * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
   * 
   * @param {string} call 
   * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
   * 
   * example: flipACoin('tails')
   * returns: { call: 'tails', flip: 'heads', result: 'lose' }
   */
  
function flipACoin(call) {
    const coin = coinFlip()
    if(coin == call){
      results = "win"
    }
    else{
      results = "lose"
    }
    return  { call: call, flip: coin, result: results}
  }
  
  
  /** Export 
   * 
   * Export all of your named functions
  */
  