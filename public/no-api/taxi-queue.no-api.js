document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'no-api-1.0',
			passengers: 0,
			taxis: 0,
			passMessage: '',
			passLeave: '',
			taxiJoin: '',
			departMessage: '',

			joinQueue() {
				if(this.passengers >= 0){
					this.passengers++;
					this.passMessage = 'Passenger(s) joined queue';
				}
				setTimeout(() =>{
					this.passMessage = '';
				}, 3000)
			},
		

			leaveQueue() {
				if(this.passengers > 0){
					this.passengers--;
					this.passLeave = 'Passenger(s) left queue';
				}
				setTimeout(() => {
					this.passLeave = '';
				}, 3000)
			},
		
			joinTaxiQueue() {
				if(this.taxis >= 0) {
					this.taxis++;
					this.taxiJoin = 'Taxi(s) joined the queue'
				}

				setTimeout(() => {
					this.taxiJoin = '';
				}, 3000)
			},

			taxiDepart(){
				if(this.taxis > 0 && this.passengers >= 12){
					this.taxis--;
					this.passengers-= 12;
					this.departMessage = 'Taxi has departed';
				}

				setTimeout(() => {
					this.departMessage = '';
				}, 3000)
			}
		}

	});

});


