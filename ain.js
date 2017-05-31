var usernameFormApp = new Vue({
    el: '#usernameForm',
    data: {
        username: '',
        agreement: false,
        started: false,
        loading: false
    },
    watch: {
        'started': function() {
            galleryApp.enabled = this.started;
        }
    },
    methods: {
        start: function() {
            this.loading = true;
            Vue.http.get('https://wtdc6t63o9.execute-api.us-east-1.amazonaws.com/test/nextPhotoToEvaluation')
                .then(function(res) {
                    galleryApp.$data.files = res.body.files;
                    usernameFormApp.loading = false;
                    usernameFormApp.started = true;
                });
        }
    }
});

// var files = ["17103569_108854849647783_2402805566146980323_n.jpg", "17239866_104420880093062_6150393456535171111_o.jpg", "17264740_106626129871219_8605316659287867274_n.jpg", "17265230_105471103320526_4391520527754382399_n.jpg", "17308727_110940576110847_6389105123877102563_n.jpg", "17309275_110170552853979_3573139596625981141_n.jpg", "17361557_105056533366725_6415583525319437014_n.jpg", "17362707_101757743697008_6317228378980269128_n.jpg", "17424756_101371153737964_6099387692437717390_n.jpg", "17436089_121376715069163_1553109567860411495_o.jpg", "17457904_120673278471917_8748066720212522711_n.jpg", "17457975_100348653840946_3995067154234626082_n.jpg", "17458212_119155838623484_8465896656304561187_n.jpg", "17458347_106225086587580_8776569360499314932_n.jpg", "17492586_112792302592131_6326113472581482043_o.jpg", "17522975_102727183618683_3039311498025018642_n.jpg"];

var galleryApp = new Vue({
    el: '#gallery',
    data: {
        enabled: usernameFormApp.$data.started,
        currentImageIndex: 0,
        files: []
    },
    methods: {
        evaluate: function(value) {
            var imageIndex = this.currentImageIndex;
            this.$http.put('https://wtdc6t63o9.execute-api.us-east-1.amazonaws.com/test/evaluation', {
                    "imageFilename": this.files[imageIndex],
                    "username": usernameFormApp.$data.username,
                    "favorability": value
                }).then(function(res) {
                    console.log('Evauation done(' + imageIndex + '): ' + res.bodyText);
                    this.currentImageIndex++;
                });
        }
    }
});
