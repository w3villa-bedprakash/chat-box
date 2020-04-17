/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    loginPage: function (req, res) {
        res.view('pages/login')
    },
    chat: function (req, res) {
        req.session.user = req.body.username;
        res.redirect('/chat')
    },
    chatPage: function (req, res) {
        if (!req.session.user) {
            res.redirect('/');
        }
        else {
            res.view('pages/homepage',{user: req.session.user});
        }
    },
    onConnect:function(req,res){
        sails.sockets.join(res, 'chat-chaneel')
        return res.ok()
    },
    SendMessage: function(req,res){
        
        //res.end("hello")
        let texts = req.body.text;
        console.log("msg: "+ texts + "  end")
         sails.sockets.broadcast('chat-channel', 'chat', texts)
         return res.ok();
    }

};

