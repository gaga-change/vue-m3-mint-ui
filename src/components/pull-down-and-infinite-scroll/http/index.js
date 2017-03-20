/**
 * Created by 严俊东 on 2017/3/20.
 */
const getHttp = function () {
    let http = {
        getTop(firstValue) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (firstValue > -40) {
                        let ret = [];
                        for (let i = 20; i > 0; i--) {
                            ret.push(firstValue - i);
                        }
                        resolve(ret)
                    } else {
                        resolve([])
                    }
                }, 1000)
            });
        },
        loadMore(lastValue){
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (lastValue < 60) {
                        let ret = [];
                        for (let i = 1 ; i < 20; i++) {
                            ret.push(lastValue + i)
                        }
                        resolve(ret);
                    } else {
                        resolve([]);
                    }
                }, 1000)
            })
        }
    };
    return http;
};
export default getHttp()
