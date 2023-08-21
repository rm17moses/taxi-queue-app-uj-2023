document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'api-1.0',
			queueLength: 0,
            Passmessage: '',
            passLeft: '',
            leftMessage: '',
            taxiCount: 0,
            PassCount: 0,
			depMessage: '',
			Taximessage: '',
			notFull: '',
			noTaxi: '',

			joinQueue() {
                axios
                    .post('/api/passenger/join')
                    .then(result => {
                        this.Passmessage = result.data.message;
						if(this.queueLength >= 0){
                        this.queueLength++;
						}

						setTimeout(() => {
							this.Passmessage = '';
						}, 3000)
                    });
            },
		
			leaveQueue() {
				axios
				.post('/api/passenger/leave')
				.then(result => {
					this.leftMessage = result.data.message;
					if (this.queueLength > 0) {
					this.queueLength--;
					}

					setTimeout(() => {
						this.leftMessage = '';
					}, 3000)
				});
		},
		
			joinTaxiQueue() {
				axios
                    .post('/api/taxi/join')
                    .then(result => {
                        this.Taximessage = result.data.message;
						if(this.taxiCount >= 0){
							this.taxiCount++;
						}
						setTimeout(() =>{
							this.Taximessage = '';
						}, 2000)
                    });
            },
		
			queueLengths() {
				axios
                    .get('/api/passenger/queue')
                    .then(result => {
                        this.queueLength = result.data.queueCount;
                    });
            },

			taxiQueueLength() {
				axios
                    .get('/api/taxi/queue')
                    .then(result => {
                        this.taxiCount = result.data.queueCount;
                    });
            },

			
			taxiDepart(){
				axios
                    .post('/api/taxi/depart')
                    .then(result => {
                        
						if(this.queueLength >= 12 && this.taxiCount > 0) {
							this.taxiCount--;
							this.queueLength -= 12;
							this.depMessage = result.data.message;
						} else if (this.queueLength < 12){
							this.notFull = 'The taxi is not full';
						} else if (this.taxiCount === 0) {
							this.noTaxi = 'There are no taxis';
						}
                        
						setTimeout(()=> {
							this.depMessage = '';
							this.notFull = '';
							this.noTaxi = '';
						}, 3000)
                    });
            },

			init() {
				this.queueLengths();
                this.taxiQueueLength();
			}
		}

	});


});


