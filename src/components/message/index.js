import Vue from 'vue'
import dialog from './message.vue'
let DialogConstructor = Vue.extend(dialog);
let instance,currentMsg,msgQueue = []
let merge = function(target) {
    for (var i = 1, j = arguments.length; i < j; i++) {
        var source = arguments[i];
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                var value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }

    return target;
};
const defaults = {
    title: '提示',
    message: '',
    html:'',
    type: '',
    cancelText: '取消',
    confirmText: '确定'
}
const initInstance = () => {
    instance = new DialogConstructor({
        el: document.createElement('div')
    })
    instance.callback = function(action) {
        if (currentMsg) {
            var callback = currentMsg.callback
            if (typeof callback === 'function') {
                callback(action)
            }
        }
    }
}

const showNextDialog = () => {
    if (!instance) {
        initInstance()
    }
    if (!instance.visible || instance.closeTimer) {
        if (msgQueue.length > 0) {
            currentMsg = msgQueue.shift();
            var options = currentMsg.options;
            for (var prop in options) {
                if (options.hasOwnProperty(prop)) {
                    instance[prop] = options[prop];
                }
            }
            ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(prop => {
                if (instance[prop] === undefined) {
                    instance[prop] = true;
                }
            })
            document.body.appendChild(instance.$el)
            Vue.nextTick(() => {
                instance.visible = true
            })
        }
    }
}

let Message = ({callback,...res}) => {
    msgQueue.push({
        options: merge({}, defaults, Message.defaults || {}, res),
        callback: callback
    })
    showNextDialog()
}

Message.setDefaults = defaults => {
    Message.defaults = defaults
}

Message.alert = options => {
    options.html=options.message||options.html;
    options.confirmText = options.okVal||'确定';
    return Message(merge({
        $type: 'alert',
        title:'',
        showCancelButton:false,
        notClose: false
    }, options))
}
Message.confirm = options => {
    options.html=options.message||options.html;
    return Message(merge({
        $type: 'confirm',
        showCancelButton: true,
        notClose: false
    }, options));
}
Message.close = (cb) => {
    instance ? instance.visible = false : '';
    cb && cb();
}

export { Message }

let Plugin = {}
Plugin.install = function(Vue) {
    Vue.prototype.$message = Message
}
export default Plugin
