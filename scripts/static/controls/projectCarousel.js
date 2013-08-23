can.Control('Bitovi.OSS.ProjectCarousel', { 
  defaults: {
    view: 'guides/static/templates/projectCarousel.mustache'
  }
}, {
  init: function(el, options) {
    var canvas = !!((document.createElement('canvas')).getContext);
    this.state = new can.Observe({});

    // can.Mustache.registerHelper('grayscale', function() {
    //   return function(el) {
    //     el = $(el);
    //     if(canvas) {
    //       el.one('load', function() {
    //         Grayscale(el, 300);
    //       }) 
    //     }
    //   }
    // });

    Bitovi.OSS.App.findAll().done(can.proxy(function(apps) {
      this.state.attr('apps', apps);
      this.state.attr('current', {
        title: apps[0].title,
        body: apps[0].body,
        link: apps[0].link
      });

      this.element.html(can.view(this.options.view, this.state));

      this.element.find('.carousel').scrollbox({
        direction: 'h',
        switchItems: 1,
        distance: 200,
        delay: 5
      });

      this.current = this.element.find('li:first').addClass('current');
    }, this));
  },

  '.carousel moving': function(el, ev) {
    this.showProject(el.find('li:eq(1)'), ev);
  },

//  'li mouseenter': 'showProject',

  'a click': function(el, ev) {
    el = el.closest('li');
    this.showProject(el, ev);
    return false;
  },

  showProject: function(el, ev) {
    var project = el.data('project'),
      self = this;

    if(!el.hasClass('current')) {
      this.element.find('.content').fadeOut(function() {
        self.current.removeClass('current');
        self.current = el.addClass('current');
        self.state.attr('current.title', project.title);
        self.state.attr('current.body', project.body);
        self.state.attr('current.link', project.link);
        $(this).fadeIn();
      });
    }
  }
})