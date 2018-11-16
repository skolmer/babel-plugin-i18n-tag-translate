@i18nGroup('custom group')
export class Test {
    log() {
        console.log(this.i18n`Hello ${name}, you have ${amount}:c in your bank account.`)
        console.log(i18n('custom inline group') `Hello!`)
        console.log(this.i18n('custom inline group') `Welcome!`)
    }    
}


class TestX {
    log() {
        console.log(this.i18n`Hello ${name}, you have ${amount}:c in your bank account.`)
        console.log(i18n('custom inline group') `Hello!`)
        console.log(this.i18n('custom inline group') `Welcome!`)
    }    
}
export let Test2 = i18nGroup('custom group 2')(TestX)

// anonymous class
@i18nGroup('custom group 3')
export default class {
    log() {
        console.log(this.i18n`Hello ${name}, you have ${amount}:c in your bank account.`)
        console.log(i18n('custom inline group') `Hello!`)
        console.log(this.i18n('custom inline group') `Welcome!`)
    }    
}