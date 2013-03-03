function DashboardController($scope, $routeParams, $http) {
	
	$scope.groupId = $routeParams.groupId;
	
	if ($scope.groupId != null) {
		$http.get('/groups/' + $scope.groupId + '/shares').success(function(data) {
			$scope.handleShares(data);
		});		
	} else {
		// TODO: Show loader if local data is empty
		$http.get('/shares').success(function(data) {
			$scope.handleShares(data);
		});		
	}
	
	/**
		Convenience methods for processing shares after HTTP callback
	*/
	$scope.handleShares = function(shares) {
		for (var i = 0; i < shares.length; i++) {
			var share = shares[i];
			var groupId = share.group_id;
			var group = Group.getGroupById(groupId);
			share.group = group;
		}
		
		$scope.allShares = shares;
		$scope.filterAllShares();
	};
	
	/*
		When the user selects a share
	*/
	$scope.selectShare = function(share) {
		// TODO: Expand the share
	};
	
	/*
		Sets the media type we are filtering
	*/
	$scope.setMediaType = function(mediaType) {
		$scope.mediaType = mediaType;
		$scope.filterAllShares();
	};
	
	/*
		Sets the search query for controller
	*/
	$scope.setSearchQuery = function(query) {
		$scope.searchQuery = query;
		$scope.filterAllShares();
	};
	/*
		All visible shares will be filtered right here
	*/
	$scope.filterAllShares = function() {
		var filteredShares = [];
		for (var i = 0; i < $scope.allShares.length; i++) {
			var share = $scope.allShares[i];
			if ($scope.mediaType) {
				if (share.media_type == $scope.mediaType) {
					filteredShares.push(share);				
				}
			} else {
				filteredShares.push(share);
			}
		}
		
		if ($scope.searchQuery != null) {
			filteredShares = filteredShares.filter(function(share) {
				return share.title.indexOf($scope.searchQuery) !== -1 || share.title.indexOf($scope.searchQuery) !== -1;
			});
		}
		
		$scope.shares = filteredShares;
	}
}

DashboardController.$inject = ['$scope', '$routeParams', '$http'];