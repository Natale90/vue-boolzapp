
function init() {


    var root = new Vue({

        el: '#app',

        data: {

            contacts: [

                {
                    name: 'Poul Mcartney',
                    avatar: 'img/img1.jpg',
                    visible: true,
                    messages: [{
                            date: '10/01/2020',
                            time: '15:30',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020',
                            time: '15:50',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020',
                            time: '16:15',
                            text: 'Tutto fatto!',
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
                            time: '16:30',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020',
                            time: '16:30',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020',
                            time: '16:35',
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
                            time: '10:10',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020',
                            time: '10:20',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020',
                            time: '16:15',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },

                {
                    name: 'Yoko Hono',
                    avatar: 'img/img4.jfif',
                    visible: true,
                    messages: [{
                            date: '10/01/2020',
                            time: '15:30',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020',
                            time: '15:50',
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

            //find a contat in the list variables
            'searchInList': '',
            'contactName': '',

            //chatWindow variables
            'currentConversation': [],
            "myMessages": [],
            "activeElem": '',
            activeMessage: null,
            "mypic": 'img/profile_pic.jpg',

            // emoji
            'ShowEmo': false,
            'ActiveEmo': '',
            "myLastText": '',

            // file Attach
            attachFile: false,

            // vocal recording
            audioId: '',
            isRecording: false,
            recSeconds: 00,
            recMinutes: 0,

            notMyObj: {},

        }, //end of data

        computed: {

            filteredContacts: function() {

                return this.contacts.filter((el) => {

                    if (el.name.toLowerCase().includes(this.searchInList.toLowerCase())) {
                        return el;
                    }

                });
            }
        },

        methods: {

            // a function to cut the last message's preview string in the contact list
            cutText: function(text, length, suffix) {

                if (text.length > length) {
                    return text.substring(0, length) + suffix;
                } else {
                    return text; // but if the text is no longer than the length I decided then it gives back the length
                }
            },

            // a function to get a string for current date
            getDate: function() {

                const toDay = new Date();
                const toDayStr = `${toDay.getDate()}/${toDay.getMonth() + 1}/${toDay.getFullYear()}`;
                return toDayStr;
            },

            // a function to get a string for current time
            getTime: function() {

                const now = new Date();
                const min = now.getMinutes();
                let nowStr = '';

                if (min < 10) {

                    nowStr = `${now.getHours()}:0${min}`
                } else {
                    nowStr = `${now.getHours()}:${min}`
                }
                return nowStr;
            },

            //activeElem is equal to one element in contacts. currentConversation is equal to the message elem in activeElem
            activateChat: function(index, contact) {
                this.activeElem = contact;
                this.currentConversation = contact.messages;

                if (this.ShowEmo != false) {

                    this.ShowEmo = false;

                }

            },

            // setting a function that allows to send and recieve text messages.
            sendNewText: function() {

                let myObj = {

                    //init a new object witcth content is the last message the user writes, date, time and status.
                    date: this.getDate(),
                    time: this.getTime(),
                    text: this.myLastText,
                    status: 'sent'

                }

                //if the input is not empty than push the new object into the conversation's array of objects and reset the input area to an empty space.
                if (this.myLastText.length > 0) {

                    this.currentConversation.push(myObj);

                    this.myLastText = '';

                    //then create a new object for the answer and push it into the current conversetion's array of objects.
                    const fixedConversation = this.currentConversation;
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

            // a function to toggle the dropdown on a message in the chat
            setActiveMessage: function(message) {

                if (this.activeMessage === message) {

                    this.activeMessage = null;
                } else {

                    this.activeMessage = message;
                }
            },

            // a function to remove the message in the chats.
            removeMessage: function(indexarg) {

                this.currentConversation.splice(indexarg, 1);
                this.activeMessage = null;
            },

            // a method that toggles the file attach options
            attachNewFile: function(){

                this.attachFile = !this.attachFile
            },


            // a method that starts the vocal recording
            startRecording: function(){
                this.isRecording = true;
                this.countTimeRec();
            },

            // a method that tracks the record duration
            countTimeRec: function(){

                this.audioId = setInterval(() => {

                    if(this.recSeconds < 59){

                        this.recSeconds++;

                        if(this.recSeconds < 10)
                        this.recSeconds = `0${this.recSeconds}`;
                    } else{

                        this.recSeconds = 0;
                        this.recMinutes++;
                    }
                }, 1000);

            },

            // a method to stop and delete the vocal recording
            deleteVocal: function(){
                clearInterval(this.audioId);
                this.recMinutes = 0;
                this.recSeconds = 0;
                this.isRecording = false;
            },

            // a method that sends the vocal message
            sendVocal: function(){

                clearInterval(this.audioId);

                let myObj = {

                    //init a new object witcth content is the last message the
                    // user writes, date, time and status.
                    date: this.getDate(),
                    time: this.getTime(),
                    text: `audio ${this.recMinutes}:${this.recSeconds}`,
                        // `
                        // <i class="fas fa-play"></i>
                        // <div class="ms_audio"></div>
                        // <span>'${this.recMinutes}:${this.recSeconds}</span>
                        // `,
                    status: 'sent'

                };

                //if the input is not empty than push the new object into
                // the conversation's array of objects and reset the input area
                // to an empty space.
                if (this.recSeconds >= 1) {

                    this.currentConversation.push(myObj);

                    this.recMinutes = 0;
                    this.recSeconds = 0;


                    //then create a new object for the answer and push it
                    // into the current conversetion's array of objects.
                    const fixedConversation = this.currentConversation;
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

                this.isRecording = false;
            },

        }, //end of methods

    })


    /* EMOJI */
    var input = document.querySelector('.emoji_btn');
    var picker = new EmojiButton({
        position: 'top-start'
    })

    picker.on('emoji', function (emoji) {
        root.myLastText += emoji;
    })

    input.addEventListener('click', function () {
        picker.pickerVisible ? picker.hidePicker() : picker.showPicker(input);
    })

}

document.addEventListener('DOMContentLoaded', init);
