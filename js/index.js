$(document).ready(function(){
    document.addEventListener('deviceready', function(){
        getRepos();
    });

    $('.ui-input-clear').click(function(){
        $('#searchResults').hide();
        $('#userInfo').hide();
    });

    $('#search_btn').click(function(e){
        e.preventDefault();
        var search_html='';
        var user_html='';
        var username= $('#search_input').val();

        var user_url = 'https://api.github.com/users/'+username+'?client_id=xxxx&client_secret=yyyy';
        var repo_url = 'https://api.github.com/users/'+username+'/repos?client_id=xxxx&client_secret=yyyy';

        $.ajax({
            url: repo_url,
            dataType: 'jsonp',
            success: function(response){
                $.ajax({
                    url: user_url,
                    dataType: 'jsonp',
                    success: function(response){
                        user_html += '<h3><img class="thumbnail" src="'+response.data.avatar_url+'"><a href="'+response.data.html_url+'" target="_blank">'+response.data.name+'</a></h3><div style="clear:both;"></div><br/><br/>';
                        $("#userInfo").html(user_html);
                    }
                });
                $.each(response.data, function(i, item){
                    search_html += '<li><h1><a href="'+this.html_url+'" target="_blank">'+this.name+'</a></h1><p class="names">By '+ this.owner.login +'</p></li>'
                });
                $('#searchResults').append(search_html);
                $('#searchResults').listview('refresh');
            }
        });
    });
});
//Get repos for home screen
function getRepos(){
    var html = '';
    $.ajax({
        url: "https://api.github.com/repositories?client_id=xxxx&client_secret=yyyy'",
        dataType: "jsonp",
        success: function(response){
            $.each(response.data, function(i,item){
                if (i<10) {
                    html+='<li><img class="thumbnail" src="'+this.owner.avatar_url+'"><h1><a href="'+this.html_url+'" target="_blank">'+this.name+'</a></h1><p class="names">By '+this.owner.login+'</p></li>';
                }
            });
            $('#repoList').append(html);
            $('#repoList').listview('refresh');
        }
    });
}