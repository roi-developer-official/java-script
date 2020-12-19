
try {
    throw ({ message: 'errorrr' });
}
catch (err) {
    console.log(err);
    throw err;
}
finally {
    console.log('this code will execute allways');
}