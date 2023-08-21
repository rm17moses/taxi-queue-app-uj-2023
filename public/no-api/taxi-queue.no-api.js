document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'no-api-1.0',
			passengers: 0,
			taxis: 0,

			joinQueue() {
				// console.log(this.passengers++);
				if(this.passengers >= 0){
					this.passengers++;
				}
			},
		

			leaveQueue() {
				if(this.passengers > 0){
					this.passengers--;
				}
			},
		
			joinTaxiQueue() {
				if(this.taxis >= 0) {
					this.taxis++;
				}
			},

			taxiDepart(){
				if(this.taxis > 0 && this.passengers >= 12){
					this.taxis--;
					this.passengers-= 12;
				}
			}
		}

	});

});


