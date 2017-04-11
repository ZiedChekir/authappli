module.exports = {
    additionalSignUpFields: [
        {
            name: "adress ",
            placeholder: "Enter your adress ",
            // The following properties are optional
            icon: "",
            prefill: "street 123",
            validator: function(address) {
                return {
                    valid: address.length >= 10,
                    hint: "Must have 10 or more chars" // optional
                };
            }
        }, {
            name: "name",
            placeholder: "Enter your name"
        }
    ],
    socialButtonStyle: 'small',
    closable: false,
    auth: {
        redirectUrl: 'http://localhost:3000/user/callback',
        responseType: 'code',
        params: {
            scope: 'openid name email picture'
        }
    },
    theme: {
        logo: 'https://s-media-cache-ak0.pinimg.com/600x315/a2/19/e1/a219e1302acd9caf8949f7efb180a75e.jpg',
        primaryColor: 'green'
    },
    languageDictionary: {
        title: "Klap"
    }
}
