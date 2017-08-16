/**
 * Created by yaoyc on 2017/2/9.
 */
(function(){
	"use strict";
	function arrayCopy(from,from_start,to,to_start,length){
		for(var i =from_start;i<length;i++){
			to[to_start] = from[i];
			to_start++;
		}
		console.log(to);
	}
	function easyCopy(args){
		arrayCopy(args.from, args.from_start||0, args.to, args.to_start||0, args.length);
	}
	var a =[1,2,3,4,5],b = [];
	easyCopy({from:a,to:b,length:1,to_start:0});
})();