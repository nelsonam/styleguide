const React = require('react');
const classNames = require('classnames');

const SIZES = require('./SIZES');

const Input = React.createClass({
    propTypes: {
        className:    React.PropTypes.string,
        onChange:     React.PropTypes.func,
        onFocus:      React.PropTypes.func,
        onBlur:       React.PropTypes.func,
        onKeyDown:    React.PropTypes.func,
        onClick:      React.PropTypes.func,
        name:         React.PropTypes.string,
        type:         React.PropTypes.string,
        placeholder:  React.PropTypes.string,
        disabled:     React.PropTypes.bool,
        readOnly:     React.PropTypes.bool,
        autoFocus:    React.PropTypes.bool,
        size:         React.PropTypes.oneOf(SIZES),
        defaultValue: React.PropTypes.string,
        value:        React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.bool
        ])
    },

    /**
     * Focus this input
     */
    focus: function() {
        this.refs.input.focus();
    },

    getDefaultProps: function() {
        return {
            type: 'text',
            size: SIZES[0]
        };
    },

    onChange: function(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    },

    render: function() {
        var { onBlur, onFocus, onKeyDown, onClick, value, readOnly, defaultValue,
            size, autoFocus, placeholder, type,
            name, disabled } = this.props;

        var className = classNames('form-control', 'input-' + size, this.props.className);

        return <input ref="input"
            type={type} autoFocus={autoFocus}
            className={className} disabled={disabled} readOnly={readOnly}
            name={name} value={value} defaultValue={defaultValue}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onClick={onClick}
            onChange={this.onChange}
        />;
    }
});


/**
 * Create a style of alert
 * @param {String} style
 * @return {React.Component}
 */
function createInputType(type) {
    return React.createClass({
        displayName: Input.displayName + type,
        render: function() {
            return <Input {...this.props} type={type.toLowerCase()} />;
        }
    });
}

const InputGroup = React.createClass({
    propTypes: {
        children:  React.PropTypes.node,
        className: React.PropTypes.string
    },

    render: function() {
        var className = classNames('input-group', this.props.className || []);
        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

const InputGroupAddon = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <span {...this.props} className="input-group-addon">
                {this.props.children}
            </span>
        );
    }
});

module.exports            = Input;
module.exports.Email      = createInputType('Email');
module.exports.Password   = createInputType('Password');
module.exports.Group      = InputGroup;
module.exports.GroupAddon = InputGroupAddon;
