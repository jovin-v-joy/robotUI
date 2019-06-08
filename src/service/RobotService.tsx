import * as HttpService from './ApiService';

export async function place(x: number, y: number, position: string) {
	return await HttpService.get(`/place?x=${x}&y=${y}&position=${position}`);
}

export async function move() {
	return await HttpService.get(`/move`);
}

export async function leftTurn() {
	return await HttpService.get(`/leftTurn`);
}

export async function rightTurn() {
	return await HttpService.get(`/rightTurn`);
}

export async function report() {
	return await HttpService.get(`/report`);
}