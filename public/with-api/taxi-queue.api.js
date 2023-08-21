document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'api-1.0',
			queueLength : 0,
			Passmessage: '',
			passengers: '',
			taxis: '',
			Taximessage: '',
			passLeft: '',
			leftMessage: '',
			taxiLeft: '',
			TaxMessage: '',
			taxiCount: 0,
			PassCount: 0,

			joinQueue() {
				return axios
					.post('/api/passenger/join', {
						
					})
			},
		
			leaveQueue() {
				axios 
					.post('/api/passenger/leave', {
						"passLeave": passLeft
					}).then(result => {
						this.leftMessage = result.data.message
					})
			},
		
			joinTaxiQueue() {
				axios
					.post('/api/taxi/join', {
						"taxi": taxis
					}).then(result => {
						this.Taximessage = result.data.message;
					})
			},
		
			queueLength() {
				axios 
				.get('/api/passenger/queue')
				.then(result => {
					this.PassCount = result.data.queueCount
				})
			},
			
			taxiQueueLength() {
				axios 
				.get('/api/taxi/queue')
				.then(result => {
					this.taxiCount = result.data.queueCount
				})
			},
			
			taxiDepart(){
				axios 
					.post('/api/taxi/depart', {
						"departed": depart
					}).then(result => {
						this.depMessage = result.data.message
					})
			},

			init() {
				axios
					.get('/api/passenger/queue')
					.then(result => {
						// an example API call
						this.queueLength = result.data.queueCount
					});
			}
		}

	});


});


