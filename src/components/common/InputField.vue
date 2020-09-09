<template>
    <div :id="id" class="c-input-field">
        <label v-if="label" :for="id + '-input-field'"> {{ label }} </label>
        <input
            :id="id + '-input-field'"
            ref="input"
            :class="[!error ? '' : 'error']"
            :disabled="disabled"
            :type="type"
            :value="tempValue"
            step="any"
            class="c-input-field"
            @input="updateInput({ val: $event.target.value, el: 'input' })"
            @keydown="emitKeyDown"
        />
        <span :id="id + '-input-prefix'" v-if="prefix && value"> {{ prefix }} </span>
    </div>
</template>

<script lang="ts">
/* types */
import Vue, { PropType } from 'vue'
import { VueConstructor } from 'vue/types/umd'

export interface UpdateInputPayload {
    val: number | string
    el: string
}

export default (Vue as VueConstructor<
    Vue & {
        $refs: {
            input: HTMLElement
        }
    }
>).extend({
    name: 'input-field',

    props: {
        /**
         * Disables the whole component
         */
        disabled: {
            type: Boolean as PropType<boolean>,
            default: false,
            required: false,
        },
        /**
         * Defines if this field should be focused while mounted
         */
        focusOnMount: {
            type: Boolean as PropType<boolean>,
            default: false,
            required: false,
        },
        /**
         * ID of this component (also used in html)
         */
        id: {
            type: String as PropType<string>,
            required: true,
        },
        /**
         * Defines if the input is connected to a custom type of v-model
         */
        isCustomVModel: {
            type: Boolean as PropType<boolean>,
            default: false,
            required: false,
        },
        /**
         * Description label displayed near the component
         */
        label: {
            type: String as PropType<string>,
            default: '',
            required: false,
        },
        /**
         * Prefix for the input field
         */
        prefix: {
            type: String as PropType<string>,
            default: '',
            required: false,
        },
        /**
         * Type of input field
         */
        type: {
            type: String as PropType<string>,
            default: 'string',
            required: false,
        },
        /**
         * Inline function for validating an input value<br>
         * (v) => {return mx_validate_validatePositiveNumber(v)}
         */
        // eslint-disable-next-line vue/require-default-prop
        validate: {
            type: Function as PropType<(v: string | number) => boolean>,
            required: false,
        },
        /**
         * Current value (bind via v-model)
         */
        value: {
            type: [String, Number] as PropType<string | number>,
            default: '',
            required: false,
        },
    },

    data: function() {
        return {
            // internal value which is always shown despite this, if it's correct or not
            tempValue: 0 as number | string,
            error: false as boolean,
        }
    },

    watch: {
        // for changes from outside - still with validation
        value: function(val): void {
            this.updateInput({ val: val, el: 'watcher' })
        },
    },

    mounted() {
        this.tempValue = this.value
        this.focusOnMount ? this.setFocus() : null
    },

    methods: {
        updateInput(payload: UpdateInputPayload): void {
            this.tempValue = payload.val

            // prevent from updating two times (because of the watcher)
            this.validateInput()
            if (payload.el !== 'watcher') {
                this.returnValue(payload.val)
            }
        },

        validateInput(): void {
            if (typeof this.validate !== 'undefined') {
                this.error = !this.validate(this.tempValue)
            }
        },

        returnValue(val: string | number): void {
            if (this.isCustomVModel) {
                this.$emit('input', { id: this.id, value: val, error: this.error })
            } else {
                this.$emit('input', val)
            }
        },

        setFocus() {
            this.$nextTick(() => {
                this.$refs.input.focus()
            })
        },

        emitKeyDown(e: KeyboardEvent) {
            this.validateInput()
            if (!this.error) {
                this.$emit('key-down', e)
            }
        },
    },
})
</script>
