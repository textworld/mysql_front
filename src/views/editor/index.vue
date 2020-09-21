<template>
    <div>
        <textarea ref="txt" class="txt">
        </textarea>
    </div>
</template>

<script>
    import CodeMirror from 'codemirror'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/solarized.css'
    import 'codemirror/addon/edit/closebrackets.js'
    import 'codemirror/mode/sql/sql.js'

    import 'codemirror/addon/hint/show-hint.js'
    import 'codemirror/addon/hint/show-hint.css'

    // import '@/vendor/codemirror/addon/hint/sql-hint.js'
    import 'codemirror/addon/hint/sql-hint.js'

    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "index",
        data() {
            return {
                code: '',
                editor: null,
                isRealTimeTip: false, // 是否是实时的提示
                idbLexicon: {}
            }
        },
        computed: {
            // ...mapGetters({
            //     idbLexicon: 'getIdbLexicon'
            // })
        },
        mounted() {
            this.init()
        },
        watch: {
            idbLexicon(tables) {
                // 现有实例参数
                const hintOptions = this.editor.getOption('hintOptions')
                // 动态设置tables参数
                this.editor.setOption('hintOptions', {
                    ...hintOptions,
                    tables: {
                        ...hintOptions.tables,
                        ...tables
                    }
                })

                if (this.isRealTimeTip) {
                    // 显示提示
                    this.editor.showHint()
                }
                this.isRealTimeTip = false
            }
        },
        methods: {
            // ...mapActions({
            //     setIdbLexicon: 'setIdbLexicon'
            // }),
            init() {
                const _this = this
                // 实例初始化
                this.editor = CodeMirror.fromTextArea(this.$refs.txt, {
                    tabSize: 4,
                    mode: 'text/x-mysql',
                    theme: 'solarized',
                    autoCloseBrackets: true, // 在键入时自动关闭括号和引号
                    styleActiveLine: true,
                    lineNumbers: true,
                    line: true,
                    lineWrapping: true,
                    hintOptions: {
                        completeSingle: false,
                        tables: _this.idbLexicon
                    },
                    extraKeys: {
                        'Ctrl-Space': editor => {
                            editor.showHint()
                        }
                    }
                })
                this.editor.setSize('100%', this.height + 'px')

                this.editor.on('keypress', editor => {
                    const __Cursor = editor.getDoc().getCursor()
                    const __Token = editor.getTokenAt(__Cursor)
                    if (
                        __Token.type &&
                        __Token.type !== 'string' &&
                        __Token.type !== 'punctuation' &&
                        __Token.string.indexOf('.') === -1
                    ) {
                        // 把输入的关键字统一变成大写字母
                        editor.replaceRange(
                            __Token.string.toUpperCase(),
                            {
                                line: __Cursor.line,
                                ch: __Token.start
                            },
                            {
                                line: __Cursor.line,
                                ch: __Token.end
                            },
                            __Token.string
                        )
                    }
                    editor.showHint()
                })

                // 用户实时输入监听
                this.editor.on('cursorActivity', function(editor) {
                    const __Cursor = editor.getDoc().getCursor()
                    const __Token = editor.getTokenAt(__Cursor)
                    const { string } = __Token
                    // console.log(__Cursor, __Token, string)

                    if (string.charAt(string.length - 1) === '.') {
                        // 当输入点时
                        // _this.loading = _this.$loading(true)
                        const curIndex = __Token.start
                        const curLine = _this.editor.getLine(__Cursor.line)
                        const key = curLine.slice(curLine.slice(0, curIndex).lastIndexOf(' ') + 1, curIndex) // 点前的关键字
                        const res = _this.idbLexicon[key]

                        if (res && res.length) {
                            // store中是否已有该词库数据
                            // _this.loading.close()
                        } else {
                            const last = _this.getLast(__Cursor)
                            const next = _this.getNext(__Cursor)
                            const sql = last + next

                            _this.getLexiconList({
                                key,
                                sql
                            })
                        }
                    }
                })
            },
            // 获取当前位置之前的sql语句（截至到上一个分号）
            getLast(__Cursor) {
                let sql = ''
                const s = this.editor.getRange({ line: 0, ch: 0 }, { line: __Cursor.line, ch: __Cursor.ch })
                const i = s.lastIndexOf(';')
                if (i === -1) {
                    sql = s
                } else {
                    sql = s.slice(i + 1)
                }
                return sql
            },
            // 获取当前位置之后的sql语句（截至到下一个分号）
            getNext(__Cursor) {
                let sql = ''
                const lastLine = this.editor.lastLine()
                const n = this.editor.getRange(
                    { line: __Cursor.line, ch: __Cursor.ch },
                    { line: lastLine, ch: this.editor.getLine(lastLine).length }
                )
                const i = n.indexOf(';')
                if (i === -1) {
                    sql += n
                } else {
                    sql += n.slice(0, i + 1)
                }
                return sql
            },
            // 设置value
            setValue(val) {
                this.editor.setValue(val)
            },
            // 获取value
            getValue() {
                return this.editor.getValue()
            },
            // 获取选中内容
            getSelection() {
                return this.editor.getSelection()
            },
            // http:获取词库List
            getLexiconList(params) {
                var _this = this
                console.log(params)

                this.isRealTimeTip = true
                // dbName(dbUser).表名 & alias.字段名 --补全提示
                // this.setIdbLexicon({
                //     key: 'vesta',
                //     value: ['abc', 'dce', Math.random() + '']// eg.['abc', 'dce', Math.random() + '']
                // })
                this.idbLexicon['vesta'] = ['abc', 'dce', Math.random() + '']
            }
        }
    }
</script>

<style scoped>
    .cm-s-solarized.cm-s-dark,
    .cm-s-solarized.cm-s-dark .CodeMirror-gutters {
        background-color: #000;
        text-shadow: #000 0 1px;
    }
</style>
