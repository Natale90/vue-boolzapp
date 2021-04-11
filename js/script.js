
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
              date: '10/01/2020 15:30:55',
              text: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Ricordati di dargli da mangiare',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
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
              date: '20/03/2020 16:30:00',
              text: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30:55',
              mytext: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35:00',
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
              date: '28/03/2020 10:10:40',
              text: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20:10',
              mytext: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15:22',
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
              date: '10/01/2020 15:30:55',
              mytext: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Si, ma preferirei andare al cinema',
              status: 'received'
            }
          ],
        },

      ],

      // css classes
      'sent': 'sentClass',
      'received': 'receivedClass',
      //chatWindow variables
      'currentConversation':[],
      "myMessages": [],
      "activeElem":'',
      // "activeConversation": [],
      "myLastText": '',
      "mypic": 'img/profile_pic.jpg',
      myObj:{},
      notMyObj:{},

    }, //end of data

    methods:{

      getDate: function(){


      },

      activateChat: function(index, elem){
        //activeElem is equal to one element in contacts. currentConversation is equal to the message elem in active elem
        this.activeElem = elem;
        this.currentConversation = elem.messages;

      },

      sendNewText: function() {

        this.myObj = {

          date: new Date(),
          mytext: this.myLastText,
          status: 'sent'

        }

        if (this.myLastText.length > 0) {
          this.currentConversation.push(this.myObj);
          console.log(this.myLastText, this.myObj, this.currentConversation);
          this.myLastText = '';

          setTimeout(() => {

            this.notMyObj = {

              date: new Date(),
              text: 'Ok Man!',
              status: 'received',
            },

            this.currentConversation.push(this.notMyObj);
          }, 1000);
        }

        // let v = this
        // setTimeout(function (){
        //
        //   this.notMyObj = {
        //
        //     data: new Date(),
        //     text: 'Ok Man!',
        //     status: 'received',
        //   },
        //
        //   v.currentConversation.push(this.notMyObj);
        // }, 2000);


      },

    },//end of methods

  })

}



document.addEventListener('DOMContentLoaded', init);
