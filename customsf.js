

var sopeznav = {

	afterChar : function(input, k){ // sopeznav.afterChar( 'inThisString', 'This' )
		if(k.length > 1){ return ''; }
		var v = input.indexOf(k);
		if( v == -1){ return ''; }
		return input.substring(v+1);
	},

	beforeChar : function(input , k){ // sopeznav.beforeChar( 'inThisString', 'sS' )
		if(k.length > 1){ 
			//alert('String.beforeChar() should be used with a single character');
			return null;
		}
		var v = input.indexOf(k);
		if( v == -1){ return ''; }
		return input.substring(0,v);
	},

	formatInIndianStyle : function(num){ // sopeznav.formatInIndianStyle()
		// returns a string , accepts number or string as input 
		var makecomma2 = function(input){
			if(input.length <= 2){ return input; }
			return makecomma2(input.slice(0,-2)) + "," + input.slice(-2) ;
		};

		if(!num){ return "0.00"; }
		num = String(num);
		if(num.includes('.')){
			var decimalpart = sopeznav.afterChar(num , '.');
			if(decimalpart.length>2){ decimalpart = decimalpart.slice(0,2); }
			num = sopeznav.beforeChar(num , '.');
		}else{
			var decimalpart = '00' ;
		}
		if( decimalpart.length == 1 ){ decimalpart = decimalpart + '0' ; }
		if( num.length > 3 && num.length <= 12 ){
			var last3digits = num.slice(-3);
			var numexceptlastdigits = num.slice(0,-3);
			var formatted = makecomma2( numexceptlastdigits );
			var stringtoreturn = formatted + "," + last3digits + "." + decimalpart ;
		}else if( num.length <= 3 ){
			var stringtoreturn = num + "." + decimalpart ;
		}else if( num.length > 12 ){
			var stringtoreturn = makecomma2( num ) + "." + decimalpart ;
		}

		if( stringtoreturn.slice(0,2) == '-,' ){
			stringtoreturn = '-' + stringtoreturn.slice(2);
		}
		
		return stringtoreturn ;
	}
};






// Format Price in Indian Style
$("div.ec-price-item").each(function(){
	var el = $(this);
	var price = el.text();
	if(price.includes('₹')){
		price = sopeznav.afterChar(price , '₹');
		price = price.replace(/[^\d.-]/g, '');
		var indianPrice = sopeznav.formatInIndianStyle(price);
		el.html('₹'+' ' + indianPrice);
	}
});










