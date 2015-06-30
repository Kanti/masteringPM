function doAsync2() {
    var deferredObject = $.Deferred();

    setTimeout(function () {
        deferredObject.notify(1);
    }, 1000);
    setTimeout(function () {
        deferredObject.notify(2);
    }, 2000);
    setTimeout(function () {
        deferredObject.notify(3);
    }, 3000);
    setTimeout(function () {
        var randomValue = Math.random();
        if (randomValue < 0.5) {
            deferredObject.resolve(randomValue, "val2");
        } else {
            deferredObject.reject(randomValue, "errorCode");
        }
    }, 4000);
    return deferredObject.promise();
}


var deferredObject = $.Deferred();
deferredObject.resolve("juhu");
deferredObject.done(function (data) {
    console.log(data)
});
deferredObject.done(function (data) {
    console.log(data)
});
deferredObject.done(function (data) {
    console.log(data)
});
doAsync2()
    .progress(function (progressValue) {
        console.log("doAsync5 progress : " + progressValue)
    })
    .done(function () {
        console.log("Executed after a delay");
    }).fail(function () {
        console.log("Executed if the async work fails");
    });