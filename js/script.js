
function init(){


  new Vue({

    el: '#app',

    data: {

      contacts: [

        {
          name: 'Poul Mcartney',
          avatar: 'img/img1.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020',
              time:'15:30',
              text: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020',
              time:'15:50',
              text: 'Ricordati di dargli da mangiare',
              status: 'sent'
            },
            {
              date: '10/01/2020',
              time:'16:15',
              mytext: 'Tutto fatto!',
              status: 'received'
            }
          ],
        },

        {
          name: 'Johnn Lennon',
          avatar: 'img/img2.jpeg',
          visible: true,
          messages: [
            {
              date: '20/03/2020',
              time:'16:30',
              text: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020',
              time:'16:30',
              mytext: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020',
              time:'16:35',
              text: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            }
          ],

        },


        {

          name: 'George Harrison',
          avatar: 'img/img3.jpeg',
          visible: true,
          messages: [

            {
              date: '28/03/2020',
              time:'10:10',
              text: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020',
              time:'10:20',
              mytext: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020',
              time:'16:15',
              text: 'Ah scusa!',
              status: 'received'
            }
          ],
        },

        {
          name: 'Yoko Hono',
          avatar: 'img/img4.jfif',
          visible: true,
          messages: [
            {
              date: '10/01/2020',
              time:'15:30',
              mytext: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020',
              time:'15:50',
              text: 'Si, ma preferirei andare al cinema',
              status: 'received'
            }
          ],
        },

      ],

      // css classes
      'sent': 'sentClass',
      'received': 'receivedClass',
      'textIn': 'incomeSpan',
      'textOut': 'outcomeSpan',
      //find a contant in the list variables
      'searchInList':'',
      'contactName':'',
      //chatWindow variables
      'currentConversation':[],
      "myMessages": [],
      "activeElem":'',
      "mypic": 'img/profile_pic.jpg',

      // "activeConversation": [],
      "myLastText": '',
      // myObj:{},
      notMyObj:{},

    }, //end of data

    computed:{

      filteredContacts: function(){
        return this.contacts.filter((el) =>{
          if(el.name.toLowerCase().includes(this.searchInList.toLowerCase())){
            return el;
          }
        });
      }
    },

    methods:{

      cutText: function (text, length, suffix) { // (check line 91 of HTML) I pass the name of thsi funtion inside th {{ }} and then I pass it the parameters: text, length (decide how long you want the string to be), and then the suffix "..."

        if (text.length > length) {
          return text.substring(0, length) + suffix;
        } else {
          return text; // but if the text is no longer than the length I decided then it gives back the length
        }
      }
      // a function to get a string for current date
      getDate: function(){

        let [month, date, year] = new Date().toLocaleDateString("it-IT").split("/");

        return `${month}/${date}/${year}`;
      },
      // a function to get a string for current time
      getTime:function(){

        let [hour, minute,] = new Date().toLocaleTimeString("it-IT").split(/:| /);
        return `${hour}:${minute}`;
      },

      //activeElem is equal to one element in contacts. currentConversation is equal to the message elem in activeElem
      activateChat: function(index, contact){
        this.activeElem = contact;
        this.currentConversation = contact.messages;

      },
      // setting a function that allows to send and recieve text messages.
      sendNewText: function() {

        let myObj = {
          //init a new object witcth content is the last message the user writes, date, time and status.
          date: this.getDate(),
          time: this.getTime(),
          mytext: this.myLastText,
          status: 'sent'

        }
        //if the input is not empty than push the new object into the conversation's array of objects and reset the input area to an empty space.
        if (this.myLastText.length > 0) {
          this.currentConversation.push(myObj);
          console.log(this.myLastText, myObj, this.currentConversation, this.searchInList);
          this.myLastText = '';
          //then create a new object for the answer and push it into the current conversetion's array of objects.
          const  fixedConversation = this.currentConversation;
          setTimeout(() => {

            this.notMyObj = {

              date: this.getDate(),
              time: this.getTime(),
              text: 'Ok Man!',
              status: 'received',
            },

            fixedConversation.push(this.notMyObj);
          }, 1000);

        }

      },

      removeMessage: function (indexargoument){

        this.currentConversation.splice(indexargoument, 1);
      },
    },//end of methods

  })

}

document.addEventListener('DOMContentLoaded', init);
